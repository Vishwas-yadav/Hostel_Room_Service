const {successResponse,internalServer,badRequest}=require('../../utilities/response/index');
const {registerUserService,authUserService,toggleAccessService} =require('./service');

const registerUserCtrl=async(req,res)=>{
    try {
        console.log("req register:", req.body);
        const result=await registerUserService(req.body);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error in Register User Controller:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in Register User Controller:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

const authUserCtrl=async(req,res)=>{
    try {
        console.log("login:", req.body);
        const result=await authUserService(req.body);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error in authUserCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in authUserCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
    
    }
    const toggleAccessCtrl=async(req,res)=>{
        try {
        const result=await toggleAccessService(req.params);
        successResponse(res,result);
        } catch (error) {
            if (error.kn) {
                console.log("Known error in toggleAccessCtrl:", JSON.stringify(error));
                badRequest(res, error.msg);
            } else {
                console.log("Unknown error in toggleAccessCtrl:", error);
                let errObj = {
                    err: UNKNOWN_ERROR
                };
                internalServer(res, errObj);
            }
        }
    }

 
    module.exports={
        registerUserCtrl,
        authUserCtrl,
        toggleAccessCtrl
    }