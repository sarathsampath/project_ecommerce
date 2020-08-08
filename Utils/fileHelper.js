const fs = require("fs");
const express=require("express");
const app=express();
var logger=require("../Utils/loggers");
const bodyparser=require("body-Parser");
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended:false}));

function fileRead(path) {
  try {
    logger.info("Utils :Readfile :start");
    if (fs.existsSync(path)) {
      data = fs.readFileSync(path, { encoding: "utf8" });

      data = JSON.parse(data);
      var status = JSON.stringify(data);
     // logger.info("Utils:readFile:status" + status);
      logger.info("Utils:Readfile :end");
      return status;
    } else {
      throw new Error("Readfile error");
    }
   
  } catch (err) {
    logger.error(err);
  }
}
function fileWrite(path,data)
{
  try{
    logger.info("utils:writefile:start");
    if(fs.existsSync(path))
    {
fs.writeFileSync(path,JSON.stringify(data),{spaces:2});
var status=JSON.stringify(data);
//logger.info("utils:writefile:status"+status);
logger.info("utils:writefile:end");
return status;
    }
  else{
    throw new Error("Writefile error");
  }}
    catch(err)
    {
      logger.error(err);
      logger.error("utils:writefile:end");
    }
  }




module.exports = { fileRead,fileWrite };
