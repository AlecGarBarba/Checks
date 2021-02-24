/**
 * Library for storing and rotating logs
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib')



//container
const lib = {};

lib.baseDirectory = path.join(__dirname, '/../.logs/')

lib.append = (file,str,callback)=>{
    //opening the file for appending
    fs.open(lib.baseDirectory+file+'.log','a',(err,FileDescriptor)=>{
        if(!err && FileDescriptor){
            fs.appendFile(FileDescriptor, str+'\n',(err)=>{
                if(!err){
                    fs.close(FileDescriptor,(err)=>{
                        if(!err){
                            callback(false);
                        }else{
                            callback('Failed to close the file')
                        }
                    })
                }else{
                    callback('Error appending to file')
                }
            })
        }else{
            callback('Could not open file for appending');
        }
    })
}



//List all the logs, and opt include the compressed logs
lib.list = (includeCompressedLogs, callback)=>{
    fs.readdir(lib.baseDirectory, (err,data)=>{
        if(!err && data && data.length > 0){
            const trimmedFileNames = [];
            data.forEach((fileName)=>{
                //Add the.log files
                if(fileName.indexOf('.log') > -1){
                    trimmedFileNames.push(fileName.replace('.log',''));
                }
                //Add on the .gz compressed files

                if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
                    trimmedFileNames.push(fileName.replace('.gz.b64',''));
                }
            });
            callback(false,trimmedFileNames);
        }else{
            callback(err,data)
        }
    })
}

//Compress the contents of one .log file into a .gzb64 file within

lib.compress = (logId,newFileId,callback)=>{
    const sourceFile = logId + '.log';
    const destFile = newFileId + '.gz.b64';
    fs.readFile(lib.baseDirectory+sourceFile,'utf8',(err,inputString)=>{
        if(!err){  
            //compress data using gzip
            zlib.gzip(inputString, (err,buffer)=>{
                if(!err && buffer){
                    fs.open(lib.baseDirectory+destFile,'wx',(err,fileDescriptor)=>{
                        if(!err && fileDescriptor){
                            fs.writeFile(fileDescriptor, buffer.toString('base64'), (err)=>{
                                if(!err){
                                    fs.close(fileDescriptor, (err)=>{
                                        if(!err){
                                            callback(false);
                                        }else{
                                            callback(err)
                                        }
                                    });
                                }else{
                                    callback(err);
                                }
                            })
                        }else{
                            callback(err);
                        }
                    })
                }else{
                    callback(err)
                }
            })
        }else{
            callback(err);
        }
    })
}

//Decompress the contents of a .gz.b64 file into a string var
lib.decompress = (fileId,callback) =>{
    const fileName = fileId + '.gz.b64';
    fs.readFile(lib.baseDirectory+fileName,'utf8',(err,str)=>{
        if(!err && str){
            let inputBuffer = Buffer.from(str,'base64');
            zlib.unzip(inputBuffer,(err, outputBuffer)=>{
                if(!err && outputBuffer){
                    const str = outputBuffer.toString();
                }else{
                    callback(err)
                }

            })
        }else{
            callback(err)
        }
    });
}

//Truncating a log file

lib.truncate = (logId,callback)=>{
    fs.truncate(lib.baseDirectory+logId+'.log',0,(err)=>{
        if(!err){
            callback(false);
        }else{
            callback(err);
        }
    })
}


module.exports = lib;