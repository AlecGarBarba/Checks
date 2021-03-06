
/**
 * This are the request handlers :)
*/

const config = require('./config')
const _data = require('./data');
const helpers = require('./helpers')


let handlers = {};

/**
 * 
 * ************************************html Handlers *********************************************************
 *
*/
handlers.index = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Uptime Monitoring - Made Simple',
            'head.description' : 'We offer free simple uptime monitoring for HTTP/HTTPS sites of all kinds. When your site goes down, we will send you a text to let you know.',
            'body.title' : 'Hello templated world',
            'body.class' : 'index'
        }

        helpers.getTemplate('index', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

handlers.accountCreate = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Create an account',
            'head.description' : "Signup is easy and only takes a few seconds.",
            'body.class' : 'accountCreate'
        }

        helpers.getTemplate('accountCreate', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

//Create new session
handlers.sessionCreate = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Login to your account',
            'head.description' : "Please enter your phone number and password to access your account",
            'body.class' : 'sessionCreate'
        }

        helpers.getTemplate('sessionCreate', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

//Delete the session
handlers.sessionDeleted = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Logged out',
            'head.description' : "You have been logged out of your account",
            'body.class' : 'sessionDeleted'
        }

        helpers.getTemplate('sessionDeleted', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}
//edit your account
handlers.accountEdit = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Account settings',
            'body.class' : 'accountEdit'
        }

        helpers.getTemplate('accountEdit', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}


//Acount has been deleted
handlers.accountDeleted = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Account settings',
            'head.description': 'Your account has been deleted',
            'body.class' : 'accountDeleted'
        }

        helpers.getTemplate('accountDeleted', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

//Create a Check
handlers.checksCreate = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Create a new check',
            'body.class' : 'checksCreate'
        }

        helpers.getTemplate('checksCreate', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

//Dashboard
handlers.checksList = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Dashboard',
            'body.class' : 'checksList'
        }
        helpers.getTemplate('checksList', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

//Edit any given check
handlers.checksEdit = (data,callback)=>{
    if(data.method == 'get'){
        let templateData = {
            'head.title' : 'Check Details',
            'body.class' : 'checksEdit'
        }
        helpers.getTemplate('checksEdit', templateData,(err,str)=>{
            if(!err && str){
                //add header and footer
                helpers.addUniversalTemplates(str,templateData, (err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html')
                    }
                })
                
            }else{
                callback(500,undefined,'html')
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

handlers.favicon = (data,callback)=>{
    if(data.method == 'get'){
        helpers.getStaticAsset('favicon.ico', (err,data)=>{
            if(!err && data){
                callback(200,data,'favicon');
            }else{
                callback(500)
            }
        })
    }else{
        callback(405)
    }
}

//publci

handlers.public = (data,callback)=>{
    if(data.method == 'get'){
        //get the filename being requested
        let trimmedAssetName = data.trimmedPath.replace('public/','').trim();
        if(trimmedAssetName.length > 0){
            helpers.getStaticAsset(trimmedAssetName, (err,data)=>{
                if(!err && data){
                    //Determine to content type or default to plain text
                    let contentType = 'plain';
                    if(trimmedAssetName.indexOf('.css')> -1){
                        contentType = 'css';
                    }
                    if(trimmedAssetName.indexOf('.png')> -1){
                        contentType = 'png';
                    }
                    if(trimmedAssetName.indexOf('.jpg')> -1){
                        contentType = 'jpg';
                    }
                    if(trimmedAssetName.indexOf('.ico')> -1 ){
                        contentType = 'favicon';
                    }

                    callback(200,data,contentType);
                }else{
                    callback(404)
                }
            })
        }else{
            callback(404)
        }
    }else{
        callback(405)
    }
}


/**
 * 
 * ************************************JSON API Handlers *********************************************************
 *
 */

handlers.users = (data,callback)=>{
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) >-1){
        handlers._users[data.method](data,callback);
    }else{
        callback(405);
    }
}

//containers for users submethods

handlers._users = {}
//required data: FirstName, lastName, phone, password,, tosAgreement
//opt data: none!
handlers._users.post = (data,callback)=>{
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length >0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length >0 ? data.payload.lastName.trim() : false;
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length ==10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length >0 ? data.payload.password.trim() : false;
    const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
    if(firstName && lastName && phone && password && tosAgreement){
        //Make sure that the user doesn't exist.
        _data.read('users',phone, (err,data)=>{
            if(err){
                //Hash the password :);
                const hashedPassword = helpers.hash(password);
                
                if(hashedPassword){
                    const userObject = {
                        'firstName' : firstName,
                        'lastName' : lastName,
                        'phone' : phone,
                        'hashedPassword' : hashedPassword,
                        'tosAgreement': true
                    }
                    _data.create('users', phone,userObject,(err)=>{
                        if(!err){
                            callback(200);
                        }else{
                            console.log(err);
                            callback(500,{'Error': 'Could not create a new user'})
                        }
                    })
                }else{
                    callback(500,{'Error': 'Could not hash the password'})
                }

                

            }else{
                callback(400,{'Error': 'A user with that phone number already exists'})
            }

        })
    }else{
        callback(400,{'Error' : 'Missing required fields'});
    }
};

/**
 * 
 * 
 * 
 */

handlers._users.get = (data,callback)=>{
    const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim(): false;
    
    //get token from headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    handlers._tokens.verifyToken(token,phone,(tokenisValid)=>{
        if(tokenisValid){
            if(phone){
                _data.read('users',phone,(err,data)=>{
                    if(!err && data){
                        delete data.hashedPassword;
                        callback(200, data);
                    }else{
                        callback(404,{'Error': 'User does not exist'})
                    }
                })
            }else{
                callback(400,{'Error': 'Missing required field'})
            }
        }else{
            callback(403,{'Error': 'Missing required in header, or token is invalid'})
        }
    })
};

//Required Data: phone
//optional data: firstName, lastName, pass, (at least one must be specified)
handlers._users.put = (data,callback)=>{
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length >0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length >0 ? data.payload.lastName.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length >0 ? data.payload.password.trim() : false;
    if(phone){
        if(firstName || lastName || password){

            const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
            handlers._tokens.verifyToken(token,phone,(tokenisValid)=>{
                if(tokenisValid){
                    _data.read('users',phone,(err,userData)=>{
                        if(!err && userData){
                            if(firstName){
                                userData.firstName= firstName;
                            }
                            if(lastName){
                                userData.lastName= lastName;
                            }
                            if(password){
                                userData.hashedPassword= helpers.hash(password);
                            }
                            _data.update('users',phone,userData, (err)=>{
                                if(!err){
                                    callback(200);
                                }else{
                                    console.log(err);
                                    callback(500,{'Error': 'Server error. Could not update the user.'})
                                }
                            })
                        }else{
                            callback(400,{'Error': 'The specified user does not exist.'})
                        }
                    })
                }else{
                    callback(403,{'Error': 'Missing required in header, or token is invalid'})
                }
            })
        }else{
            callback(404, {'Error': 'Nothing to update'})
        }

    }else{
        callback(404, {'Error': 'Missing required field'})
    }
    
};

//required: phone
handlers._users.delete = (data,callback)=>{
    const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim(): false;
    if(phone){
        const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        handlers._tokens.verifyToken(token,phone,(tokenisValid)=>{
            if(tokenisValid){

                _data.read('users',phone,(err,userData)=>{
                    if(!err && userData){
                        _data.delete('users',phone,(err)=>{
                            if(!err){
                                //Delete all the checks associated with the user.
                                console.log(userData)
                                let userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                                let checksToDelete = userChecks.length;

                                if(checksToDelete > 0){
                                    let checksDeleted = 0;
                                    var deletionErrors = false;
                                    userChecks.forEach((checkId)=>{
                                        _data.delete('checks', checkId,(err)=>{
                                            if(err){
                                                deletionErrors = true;
                                            }
                                            checksDeleted++;
                                            if(checksDeleted == checksToDelete){
                                                callback(200);
                                            }else{
                                                callback(500, {'Error': 'Errors encountered while trying to delete checks. All checks may have not been deleted'})
                                            }
                                        })
                                    })
                                }else{
                                    callback(200);
                                }

                                
                            } else {
                                callback(500,{'Error' : 'Could not delete the specified user'});
                            }
                        });
                    } else {
                        callback(400,{'Error' : 'Could not find the specified user.'});
                    }
                });
            }else{
                callback(403,{'Error': 'Missing required in header, or token is invalid'})
            }
        })
    }else {
        callback(400,{'Error' : 'Missing required field'})
    }
};

/*********************************TOKENS***************************************************************** */

handlers.tokens = (data,callback)=>{
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) >-1){
        handlers._tokens[data.method](data,callback);
    }else{
        callback(405);
    }
}

handlers._tokens = {}
//Required: phone, password
//opt: none
handlers._tokens.post = (data,callback)=>{
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length ==10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length >0 ? data.payload.password.trim() : false;
    if(phone && password){
        //lookup user who matches :)
        _data.read('users',phone,(err,userData)=>{
            if(!err && userData){
                //hash pass and compare
                const hashedPassword= helpers.hash(password);
                if(hashedPassword == userData.hashedPassword){
                    //create JWT 1hr valid
                    const tokenId = helpers.createRandomString(20);
                    const expires = Date.now()+1000*60*60;
                    const tokenObject ={
                        'phone': phone,
                        'id': tokenId,
                        'expires': expires
                    };

                    _data.create('tokens',tokenId,tokenObject,(err)=>{
                        if(!err){
                            callback(200,tokenObject)
                        }else{
                            callback(500,{'Error': 'Could not create the new token'})
                        }                        
                    })
                }else{
                    callback(400,{'Error':'Password did not match the specified user stored password.'})
                }
            }else{
                callback(400,{'Error': 'Could not find the specified user'})
            }
        })
    }else{
        callback(400, {'Error': 'Missing required fields'})
    }
}
//Required: id;
//opt: none;
handlers._tokens.get = (data,callback)=>{
    //Check the id is valid;
    const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim(): false;
    if(id){
        _data.read('tokens',id,(err,tokenData)=>{
            if(!err && tokenData){
                callback(200, tokenData);
            }else{
                callback(404,{'Error': 'User does not exist'})
            }
        })
    }else{
        callback(400,{'Error': 'Missing required field'})
    }

}
//required -> id[String], extend[bool]. opt=none
handlers._tokens.put = (data,callback)=>{
    const id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length ==20 ? data.payload.id.trim() : false;
    const extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend ==true ? true : false;
    if(id && extend){
        _data.read('tokens',id,(err,tokenData)=>{
            if(!err && tokenData){
                //check token isn't expired
                if(tokenData.expires > Date.now()){
                    tokenData.expires = Date.now()+ 1000*60*60;

                    _data.update('tokens',id,tokenData,(err)=>{
                        if(!err){
                            callback(200);
                        }else{
                            callback(500,{'Error': 'Could not update the token expiration'})
                        }
                    })
                }else{
                    callback(400,{'Error':'The token has already expired and cannot be extended'})
                }
            }else{
                callback(400,{'Error': 'Specified token does not exist'})
            }
        })
    }else{
        callback(400,{'Error': 'Missing required fields or fields are invalid'})
    }
}

//Rquired: id . opt = None
handlers._tokens.delete = (data,callback)=>{
    const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim(): false;
    if(id){
        // Lookup the user
        _data.read('tokens',id,(err,data)=>{
            if(!err && data){
                _data.delete('tokens',id,(err)=>{
                    if(!err){
                        callback(200);
                    } else {
                        callback(500,{'Error' : 'Could not delete the specified token'});
                    }
                });
            } else {
                callback(400,{'Error' : 'Could not find the specified token.'});
            }
        });
    }else {
        callback(400,{'Error' : 'Missing required field'})
    }
}

//Verify if a given token id is currently valid for a given user

handlers._tokens.verifyToken = (id,phone,callback)=>{
    _data.read('tokens',id,(err,tokenData)=>{
        if(!err && tokenData){
            if(tokenData.phone == phone && tokenData.expires > Date.now()){
                callback(true);
            }else{
                callback(false);
            }
        }else{
            callback(false);
        }
    })
};

/*********************************CHECKS**************************************************************************** */
handlers.checks = (data,callback)=>{
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) >-1){
        
        handlers._checks[data.method](data,callback);
    }else{
        callback(405);
    }
}

handlers._checks = {};

//required: protocol, url, method, succesCodes, timeoutSeconds;

handlers._checks.post = (data,callback)=>{
    //Validate inputs
    const protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    const method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length >0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds%1==0 && data.payload.timeoutSeconds >=1 && data.payload.timeoutSeconds <=5 ? data.payload.timeoutSeconds : false;
    
    if(protocol && url &&method &&successCodes && timeoutSeconds){
        const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        _data.read('tokens',token,(err,tokenData)=>{
            if(!err && tokenData){
                const userPhone = tokenData.phone;

                _data.read('users', userPhone,(err,userData)=>{
                    if(!err && userData){
                        let userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                        if(userChecks.length < config.maxChecks){
                            const checkId = helpers.createRandomString(20);
                            const checkObject ={
                                'id': checkId,
                                'userPhone' : userPhone,
                                'protocol': protocol,
                                'url': url,
                                'method': method,
                                'successCodes' : successCodes,
                                'timeoutSeconds' : timeoutSeconds
                            }

                            _data.create('checks',checkId,checkObject,(err)=>{
                                if(!err){
                                    //Add the check id to the user's object
                                    userData.checks = userChecks;
                                    userData.checks.push(checkId);
                                    //Save the new user data.
                                    _data.update('users',userPhone, userData,(err)=>{
                                        if(!err){
                                            callback(200, checkObject);
                                        }else{
                                            callback(500,{'Error':'Could not save the new check'})
                                        }
                                    })
                                }else{
                                    callback(500, {'Error': 'Could not create the new check'})
                                }
                            })

                        }else{
                            callback(400, {'Error': 'The user already has the maximum number of checks['+config.maxChecks+']'})
                        }
                    }else{
                        callback(403);
                    }
                })
            }else{
                callback(403,{'Error': 'not authorized'})
            }
        })
    }else{
        callback(400,{'Error':'Missing required inputs, or inputs are invalid'})
    }
}

//required data: id
//opt data: none. 
handlers._checks.get = (data,callback)=>{
    const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim(): false;
    console.log(id)
    if(id){
        //lookup the check
        _data.read('checks',id,(err,checkData)=>{
            if(!err && checkData){
                //get token from headers
                const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

                handlers._tokens.verifyToken(token,checkData.userPhone,(tokenisValid)=>{
                    if(tokenisValid){
                        //return the check data
                        callback(200,checkData)
                    }else{
                        
                        callback(403)
                    }
                }) 


            }else{
                
                callback(404);
            }
        })
        
    }else{
        
        callback(404);
    }
    
}

//Required: id
//optional dat: protocol, url, method, successCodes, timeoutSeconds (at least 1)
handlers._checks.put = (data,callback)=>{
    const id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    
    const protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    const method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length >0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds%1==0 && data.payload.timeoutSeconds >=1 && data.payload.timeoutSeconds <=5 ? data.payload.timeoutSeconds : false;
    if(id && (protocol || url || method || successCodes ||timeoutSeconds)){
        _data.read('checks',id,(err,checkData)=>{
            if(!err && checkData){
                const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

                handlers._tokens.verifyToken(token,checkData.userPhone,(tokenisValid)=>{
                    if(tokenisValid){
                        //Update the check where necessary
                        if(protocol){
                            checkData.protocol= protocol;
                        }
                        if(url){
                            checkData.url= url;
                        }
                        if(method){
                            checkData.method= method;
                        }
                        if(successCodes){
                            checkData.successCodes= successCodes;
                        }
                        if(timeoutSeconds){
                            checkData.timeoutSeconds= timeoutSeconds;
                        }
                        _data.update('checks',id,checkData,(err)=>{
                            if(!err){
                                callback(200);
                            }else{
                                callback(500,{'Error': 'Could not update the check'})
                            }
                        })
                    }else{
                        callback(403);
                    }
                })
            }else{
                callback(400,{'Error': 'Check ID does not exist'})
            }
        })
    }else{  
        callback(400, {'Error': 'Missing id, and/or fields to update'})
    }
}

//required: id, no optional data.
handlers._checks.delete = function(data,callback){
    // Check that id is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id){
      // Lookup the check
      _data.read('checks',id,function(err,checkData){
        if(!err && checkData){
          // Get the token that sent the request
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user who created the check
          handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
            if(tokenIsValid){
  
              // Delete the check data
              _data.delete('checks',id,function(err){
                if(!err){
                  // Lookup the user's object to get all their checks
                  _data.read('users',checkData.userPhone,function(err,userData){
                    if(!err){
                      var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
  
                      // Remove the deleted check from their list of checks
                      var checkPosition = userChecks.indexOf(id);
                      if(checkPosition > -1){
                        userChecks.splice(checkPosition,1);
                        // Re-save the user's data
                        userData.checks = userChecks;
                        _data.update('users',checkData.userPhone,userData,function(err){
                          if(!err){
                            callback(200);
                          } else {
                            callback(500,{'Error' : 'Could not update the user.'});
                          }
                        });
                      } else {
                        callback(500,{"Error" : "Could not find the check on the user's object, so could not remove it."});
                      }
                    } else {
                      callback(500,{"Error" : "Could not find the user who created the check, so could not remove the check from the list of checks on their user object."});
                    }
                  });
                } else {
                  callback(500,{"Error" : "Could not delete the check data."})
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400,{"Error" : "The check ID specified could not be found"});
        }
      });
    } else {
      callback(400,{"Error" : "Missing valid id"});
    }
};
  


//not found handler

handlers.notFound = (data,callback)=>{
    callback(404);
}

handlers.ping = (data,callback)=>{
    callback(200);
}



module.exports = handlers;