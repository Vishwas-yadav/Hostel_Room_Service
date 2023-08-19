const {successResponse,internalServer,badRequest}=require('../../utilities/response/index');
const {serviceRequestService}=require('./service');

const serviceRequestCtrl=async(req,res)=>{
    try {
        const result=await serviceRequestService(req.body);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error in getAllStudentsCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in getAllStudentsCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}


module.exports={
    serviceRequestCtrl
}