/**
 * Primary file for the API
 * Author: Alec García Barba
 * Date: 16-feb-2021
 */

 //Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./lib/config');
const handlers= require('./lib/handlers');
const fs = require('fs')
const helpers = require('./lib/helpers');



//https options
const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
}

//Instanciate http server
const httpServer = http.createServer((req,res)=>{
    unifiedServer(req,res);
})
//Instanciate https server
const httpsServer = https.createServer( httpsServerOptions,(req,res)=>{
    unifiedServer(req,res);
})

//Start the https server
httpServer.listen(config.httpPort,()=>{
    console.log("Listening on port: ",config.httpPort);
})
//Start the https server
httpsServer.listen(config.httpsPort,()=>{
    console.log("Listening on port: ",config.httpsPort);
})


const unifiedServer = (req,res)=>{
    // Get the URL and parse it
    let parsedUrl = url.parse(req.url, true); //this is to call querystring. Don't ask
    //Get the path from the url
    let path = parsedUrl.pathname; //key set on parsedUrl, it is the untrimmed path the user requested
    let trimmedPath = path.replace(/^\/+|\/+$/g,''); //Don't even try to understand fully this regex. It Trimms slashes at the beggining and the end
    //GET the query string as an object
    let queryStringObject = parsedUrl.query;
    //GET the http method.
    let method = req.method.toLowerCase();
    
    //Get the headers as an object
    let headers = req.headers;
    //Get the payload, if any
    const decoder = new StringDecoder('utf-8'); //pretty much any JSON
    //payloads come to the server as a stream. When the stream tells us it is the end, we manage the entire payload thingy
    let buffer = ''; //as new data comes, we append it.
    req.on('data',(data)=>{
        buffer += decoder.write(data); //as the data is streaming in, the req emits the data of undecoded data to the server. We append it once we decode it :)
    });
    req.on('end',()=>{
        buffer += decoder.end();
        
        //select handler that this request should go to. if not found, go to not found
        let chosenHandler = typeof(router[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.notFound;
        //Connstruct the data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method' :method,
            'headers' :headers,
            'payload': helpers.parseJsonToObject(buffer)
    }
    //Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload){
        //Use the status code called back by handler, or default 200
        statusCode = typeof(statusCode) == 'number' ? statusCode :200;
        //Use the payload called, or default to empty
        payload = typeof(payload) == 'object' ? payload : {};
        //Convert the payload to a string
        const payloadString = JSON.stringify(payload);
        //Return the response
        res.setHeader('Content-Type','application/json')
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log("Returning this response: ",statusCode,payloadString)
    });
}); //if there is no payload, this is still called;
}
//Define a request router

let router = {
    'ping': handlers.ping,
    'sample': handlers.sample,
    'users': handlers.users,
    'tokens' : handlers.tokens,
    'checks' : handlers.checks,

}