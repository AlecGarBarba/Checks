/**
 * Primary file for the API
 * Author: Alec García Barba
 * Date: 16-feb-2021
 */
/**
 * Debugging example command in powershell (windows)
 * $env:NODE_DEBUG='server'; node index.js
 */
//Dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');


//Declare the app

const app = {}; 

//Init the app
app.init = ()=>{
    server.init();

    workers.init()
};


//execute
app.init();


//Export the app;
module.exports = app;