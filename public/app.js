/**
 * Front end Logic
*/

//container for the frontend app.
const app = {};

// Config

app.config = {
    'sessionToken' : false,

};

//AJAX client for restful api

app.client = {};

app.client.request = (headers,path,method,queryStringObject,payload,callback)=>{
    headers = typeof(headers) == 'object' && headers !== null ? headers : {};
    path = typeof(path) == 'string' ? path : '/';
    method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
    queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
    payload = typeof(payload) == 'object' && payload !== null ? payload : {};
    callback = typeof(callback) == 'function' ? callback : false;

    // for each query string parameter sent, add it to the path

    let requestUrl = path+'?';
    let counter = 0;
    for(let queryKey in queryStringObject){
        if(queryStringObject.hasOwnProperty(queryKey)){
            counter++
            if(counter>1){
                requestUrl+='&'
            }
            requestUrl+=queryKey+'='+queryStringObject[queryKey];
        }
    }
    let xhr = new XMLHttpRequest();

    xhr.open(method,requestUrl,true);
    xhr.setRequestHeader("Content-Type","application/json");

    for (let headerKey in headers){
        if(headers.hasOwnProperty(headerKey)){
            xhr.setRequestHeader(headerKey,headers[headerKey]);
        }
    }

    //if there isa  current session token set, add that as a header
    if(app.config.sessionToken){
        xhr.setRequestHeader("token",app.config.sessionToken.id);
    }

    //When request comes back, handler response

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == XMLHttpRequest.DONE){
            let statusCode = xhr.status;
            let responseReturned = xhr.responseText;
            //callback if requested
            if(callback){
                try{
                    let parsedResponse = JSON.parse(responseReturned);
                    callback(statusCode,parsedResponse)
                }catch(e){
                    callback(statusCode,false)

                }
            }

        }

    }
    let payloadString = JSON.stringify(payload);
    xhr.send(payloadString);

}

