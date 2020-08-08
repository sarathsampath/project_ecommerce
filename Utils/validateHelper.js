var regex=require("regex");
var validator=require("email-validator");
var logger=require("../Utils/loggers");
function contactValidator(contact)
{logger.info("utils:Contactvalidator:start"+contact);
    regex=/^[0-9]{10}$/;
    var status=regex.test(contact);
    logger.info("utils:Contactvalidator:status"+status);
    logger.info("utils:Contactvalidator:end");
    return status;
}
function nameValidator(name)
{logger.info("utils:Namevalidator:start"+name);
    regex=/^([A-Z]|[a-z]){2,}$/;
    var status=regex.test(name);
    logger.info("utils:Namevalidator:status"+status);
    logger.info("utils:Namevalidator:end");
    return status;
}
function passwordValidator(password)
{logger.info("utils:passwordValidator:start"+password);
    regex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,7}$/;
    var status=regex.test(password);
    logger.info("utils:passwordValidator:status"+status);
    logger.info("utils:passwordValidator:end");
    return status;
}
function mailValidator(mail)
{
    var status=validator.validate(mail);
    return status;
}


module.exports={
    contactValidator,nameValidator,passwordValidator,mailValidator
}