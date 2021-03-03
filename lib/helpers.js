/*
+ utils /helpers. same thing
*/

const crypto = require('crypto');
const config = require('./config');
const querystring = require('querystring');
const https = require('https');
const path = require('path')
const fs = require('fs')
const helpers ={};

helpers.hash = (password)=>{
    if(typeof(password) == 'string' && password.length > 0){
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(password).digest('hex');
        return hash;
    }else{
        return false;
    }
}

helpers.parseJsonToObject = function(str){
    try{
      var obj = JSON.parse(str);
      return obj;
    } catch(e){
        
      return {};
    }
  };

helpers.createRandomString = (strLength)=>{
    strLength = typeof(strLength) == 'number' && strLength >0 ? strLength: false;

    if(strLength){
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'
        let str = ''
        let randomChar = ''
        for (i=1; i<=strLength; i++){
            randomChar = possibleCharacters.charAt(Math.floor(Math.random()*possibleCharacters.length));
            str += randomChar;
        }
        return str;
    }else{
        return false;
    }

    
}



helpers.sendTwilioSms = (phone,msg,callback)=>{
    //validate parameters
    phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() :false;
    msg = typeof(msg) == 'string' && msg.trim().length >0 && msg.trim().length <=1600 ? msg.trim() :false;
    if(phone && msg){
        const payload = {
            'From' : config.twilio.fromPhone,
            'To' : '+521'+phone,
            'Body': msg
        };
        const stringPayload = querystring.stringify(payload);
        const requestDetails ={
            'protocol': 'https:',
            'hostname': 'api.twilio.com',
            'method': 'POST',
            'path': '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
            'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length' : Buffer.byteLength(stringPayload)
            }
        }

        //instantiate the req object
        let req = https.request(requestDetails, (res)=>{
            let status = res.statusCode;
            if(status = 200 || status ==201){
                callback(false);
            }else{
                callback('Status code returned was' + status);
            }
        });

        req.on('error',(err)=>{
            callback(err);
        });

        req.write(stringPayload);
        req.end();

    }else{
        callback('Given parameters are missing or invalid')
    }
}




//Get the string content of a template
helpers.getTemplate = (templateName, data,callback)=>{
    templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof(data) == 'object' && data !== null ? data : {};
    if(templateName){
        let templatesDir = path.join(__dirname,'/../templates/');
        fs.readFile(templatesDir+ templateName+'.html','utf8',(err,str)=>{
            if(!err && str && str.length >0)
            {
                const finalString = helpers.interpolate(str,data);
                callback(false,finalString);
            }else{
                callback('No template could be found');
            }
        })
    }else{
        callback('A valid template name was not specified');
    }
};

//add universal header & footer to a string & add template.

helpers.addUniversalTemplates = (str,data,callback)=>{
    str = typeof(str) =='string' && str.length >0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};
    helpers.getTemplate('_header',data,(err,headerString)=>{
        if(!err && headerString){
            helpers.getTemplate('_footer', data, (err,footerString)=>{
                if(!err){
                    const fullString = headerString + str + footerString;
                    callback(false, fullString);
                }else{
                    callback('Could not find the footer')
                }
            })
        }else{
            callback('Could not find the header template')
        }
    })
}


//Take a given str and a data object and find/replace all the keys within it

helpers.interpolate = function(str,data){
    str = typeof(str) == 'string' && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};
  
    // Add the templateGlobals to the data object, prepending their key name with "global."
    for(var keyName in config.templateGlobals){
       if(config.templateGlobals.hasOwnProperty(keyName)){
         data['global.'+keyName] = config.templateGlobals[keyName]
       }
    }
    // For each key in the data object, insert its value into the string at the corresponding placeholder
    for(var key in data){
       if(data.hasOwnProperty(key) && typeof(data[key] == 'string')){
          var replace = data[key];
          var find = '{'+key+'}';
          str = str.replace(find,replace);
       }
    }
    return str;
  };


helpers.getStaticAsset = (fileName, callback)=>{
    fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if(fileName){
        const publicDir = path.join(__dirname,'/../public/');
        fs.readFile(publicDir+fileName,(err,data)=>{
            if(!err && data){
                callback(false,data);
            }else{
                callback('No file could be found')
            }
        })
    }else{
        callback('A valid file name was not specified')
    }
}

module.exports = helpers;