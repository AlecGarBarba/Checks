/**
 * Worker related tasks
*/
//Dependencies
const path = require('path');
const fs = require('fs');
const _data = require('./data');
const https = require('https');
const http = require('http');
const helpers = require('./helpers');
const url = require('url');
const _logs = require('./logs')
const util = require('util');
const debug = util.debuglog('workers');

const workers = {};



//Lookup all the checks, get their data, send to a validator
workers.gatherAllChecks = ()=>{
    //get checks in system
    _data.list('checks', (err,checks)=>{
        if(!err && checks &&checks.length >0){
            checks.forEach((check)=>{ 
                //Read in the check data
                _data.read('checks',check,(err,originalCheckData)=>{
                    if(!err && originalCheckData){
                        //Pass it to the validator, and let that function continue or log errs as needed
                        workers.validateCheckData(originalCheckData);
                    }else{
                        debug("Error reading one of the checks' data", err)
                    }
                })
            })
        }else{
            debug("Error, could not find any checks to process");
        }
    })
}

//Sanity-check the check-data
workers.validateCheckData = (originalCheckData)=>{
  originalCheckData = typeof(originalCheckData) == 'object' && originalCheckData !== null ? originalCheckData : {};
  originalCheckData.id = typeof(originalCheckData.id) == 'string' && originalCheckData.id.trim().length == 20 ? originalCheckData.id.trim() : false;
  originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length == 10 ? originalCheckData.userPhone.trim() : false;
  originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['http','https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol : false;
  originalCheckData.url = typeof(originalCheckData.url) == 'string' && originalCheckData.url.trim().length > 0 ? originalCheckData.url.trim() : false;
  originalCheckData.method = typeof(originalCheckData.method) == 'string' &&  ['post','get','put','delete'].indexOf(originalCheckData.method) > -1 ? originalCheckData.method : false;
  originalCheckData.successCodes = typeof(originalCheckData.successCodes) == 'object' && originalCheckData.successCodes instanceof Array && originalCheckData.successCodes.length > 0 ? originalCheckData.successCodes : false;
  originalCheckData.timeoutSeconds = typeof(originalCheckData.timeoutSeconds) == 'number' && originalCheckData.timeoutSeconds % 1 === 0 && originalCheckData.timeoutSeconds >= 1 && originalCheckData.timeoutSeconds <= 5 ? originalCheckData.timeoutSeconds : false;
  // Set the keys that may not be set (if the workers have never seen this check before)
  originalCheckData.state = typeof(originalCheckData.state) == 'string' && ['up','down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
  originalCheckData.lastChecked = typeof(originalCheckData.lastChecked) == 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;
    //if all the checks pass, pass the data along to the next step of the process :)
    if(originalCheckData.id && 
        originalCheckData.userPhone && originalCheckData.protocol &&
        originalCheckData.url && originalCheckData.method &&
        originalCheckData.successCodes && originalCheckData.timeoutSeconds){

            workers.performCheck(originalCheckData);
    }else{
        debug("Error: One of the checks is not properly formatted. Skipping it")
    }
}
//Perform the check, send the originalCheckData and the outcome of the check process
workers.performCheck = (originalCheckData)=>{
    //Prepare the initial check outcome
    const checkOutcome = {
        'error': false,
        'responseCode' : false
    };

    //Mark that the outcome has not been sent yet
    let outcomeSent = false;

    //Parse the hostname and the path out of the original check data
    const parsedUrl = url.parse(originalCheckData.protocol+'://'+originalCheckData.url,true);
    const hostName = parsedUrl.hostname;
    const path = parsedUrl.path; //path & not pathname, because we want the query string.

    //Construct the request
    const requestDetails = {
        'protocol': originalCheckData.protocol+':',
        'hostname': hostName,
        'method' : originalCheckData.method.toUpperCase(),
        'path' : path,
        'timeout': originalCheckData.timeoutSeconds * 1000
    };

    //Instantiate the request object (using either http or https module.)
    const _moduleToUse = originalCheckData.protocol == 'http' ? http : https;

    const req = _moduleToUse.request(requestDetails, (res)=>{
        //Grab the status of the sent request
        const status = res.statusCode;
        //update the checkOutcome and pass data along
        checkOutcome.responseCode = status;
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData,checkOutcome);
            outcomeSent = true;
        };
    }); 

    //Bind to the error event so it doesn't get thrown
    req.on('error',function(e){
    // Update the checkOutcome and pass the data along
        checkOutcome.error = {'error' : true, 'value' : e};
        if(!outcomeSent){
        workers.processCheckOutcome(originalCheckData,checkOutcome);
        outcomeSent = true;
        }
    });

    //Bind to the timeout event
    req.on('timeout',()=>{
        //update the checkoutcome and pass the data along
        checkOutcome.error = {
            'error': true,
            'value': 'timeout',
        }
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData,outcomeSent);
            outcomeSent = true;
        }
    });
    //end request
    req.end();
};


//Process the check outcome, update the data as needed, trigger an alert
//special logi for a check that has never been tested before;

workers.processCheckOutcome = (originalCheckData,checkOutcome)=>{
    //Decide if the check is up or down
    const state = !checkOutcome.error && checkOutcome.responseCode && originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1 ? 'up' : 'down';

    //Decide if an alert is warranted

    const alertWarranted = originalCheckData.lastChecked && originalCheckData.state !== state ? true : false;

    const timeOfCheck = Date.now();
    //log the outcome
    workers.log(originalCheckData,checkOutcome, state, alertWarranted, timeOfCheck) 
    //Update the check data

    const newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = timeOfCheck;
    

    _data.update('checks',newCheckData.id, newCheckData, (err)=>{
        if(!err){
            if(alertWarranted){
                workers.alertUserToStatusChange(newCheckData);
            }else{
                debug("check outcome has not changed, no alert needed")
            }
        }else{
            debug("error trying to save updates to one of the checks"); 
        }
    })

}

workers.alertUserToStatusChange = (newCheckData) =>{
    const msg = 'Alert: Your check for ' +newCheckData.method.toUpperCase()+' '+newCheckData.protocol+ '://' + newCheckData.url+' is currently ' + newCheckData.state;
    helpers.sendTwilioSms(newCheckData.userPhone, msg,(err)=>{
        if(!err){
            debug("success! User was alerted to a status change in their check via sms: ", msg);
        }else{ 
            debug("Error: could not send sms alert to user who had a state change");
        }
    });
}

//Logger
workers.log = (originalCheckData,checkOutcome, state, alertWarranted, timeOfCheck)=>{
    //Form the log data
    const logData ={
        'check' : originalCheckData,
        'outcome': checkOutcome,
        'state' : state,
        'alert': alertWarranted,
        'time': timeOfCheck
    }

    const logString = JSON.stringify(logData);

    //Determine the name of the log file. Dif logs by user
    const logFileName = originalCheckData.id;
    //append logstring

    _logs.append(logFileName, logString, (err)=>{
        if(!err){
            debug("logging to file succeded");
        }else{
            debug("logging failed")
        }
    })

}

//Timer to execute the worker-process one per minute;

workers.loop = ()=>{ 
    setInterval(()=>{
        workers.gatherAllChecks();
    },1000*60);
}






//Timer to execute log rotation process once per day
workers.rotateLogs = ()=>{
    //List all the (non compressed) log files
    _logs.list(false,(err, logs)=>{
        if(!err && logs && logs.length >0){
            logs.forEach((logName)=>{
                const logId = logName.replace('.log','');
                const newFileId = logId+'-'+Date.now();
                _logs.compress(logId,newFileId,(err)=>{
                    if(!err){
                        //Truncate the log. Emptying the soon to be compressed logs

                        _logs.truncate(logId, (err)=>{
                            if(!err){
                                debug("Success truncating logFile")
                            }else{
                                debug("error truncating logFile")
                            }
                        })

                    }else{
                        debug("Error compressing one of the log files", err)
                    }
                })
            })
        }else{
            debug("Error: could not find any logs to rotate")
        }
    } ) //false to not include compress files
};

workers.logRotationLoop = ()=>{
    setInterval(()=>{
        workers.rotateLogs();
    },1000*60*60*24); //once per day
}

workers.init = ()=>{
    //
    console.log('\x1b[33m%s\x1b[0m','Background workers are running');
    //execute all the checks;
    workers.gatherAllChecks();
    //Call the loop so the checks will execute later on
    workers.loop();

    //Compress all logs immediately
    workers.rotateLogs();
    //Call the compression loop so logs will be compressed later on
    workers.logRotationLoop();
}

module.exports = workers;