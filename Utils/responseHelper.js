var logger=require("../Utils/loggers");
function responseSuccess(success,message,errorCode,data)
{
	logger.info("helper: response success :start");
    var response=
    {
		"isSuccess":success,
		"message":message,
		"errorCode":errorCode,
		"data":data
	};
	logger.info("helper: response success :end");
	return response;
}
function responseFailure(success,message,errorCode)
{
	logger.info("helper: response failure :start");
	var response={
		"isSuccess":success,
		"message":message,
		"errorCode":errorCode
		
	};
	logger.info("helper: response success :end");
	return response;
}


module.exports={responseSuccess,responseFailure};