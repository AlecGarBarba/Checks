/**
 * Create and export configuration variables
 */

 // Container for all the environments

 const environments = {}


//Staging as default environment
environments.staging = {
    'httpPort': 3000,
    'httpsPort':3001,
    'envName' : 'Staging',
    'hashingSecret' : 'thisIsASecret',
    'maxChecks' : 5,
    'twilio': {
        'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
        'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
        'fromPhone' : '+15005550006'
    },
    'templateGlobals' : {
        'appName' : 'UptimeChecker',
        'companyName' : 'NotARealCompany, inc',
        'yearCreated' : '2018',
        'baseUrl' : 'http://localhost:3000'
    }


}


environments.production= {
    'httpPort': 80,
    'httpsPort':443,
    'envName': 'Production',
    'hashingSecret' : 'ThisIsAlsoAVerySecretySecret',
    'maxChecks' : 5,
    'twilio': {
        'accountSid' : '',
        'authToken':'',
        'fromPhone' : '',
    },
    'templateGlobals' : {
        'appName' : 'UptimeChecker',
        'companyName' : 'NotARealCompany, inc',
        'yearCreated' : '2018',
        'baseUrl' : 'http://localhost:443'
    }
}

//Determine which env was passed as a command-line argument

let currentEnvironmnet = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase(): 'staging';


// Check that the current environment is in our environments, if not, default to staging

let exportedEnvironment = typeof(environments[currentEnvironmnet]) =='object' ? environments[currentEnvironmnet] : 'staging';


//Export the module

module.exports = exportedEnvironment;

