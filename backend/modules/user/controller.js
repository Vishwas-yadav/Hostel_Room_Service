const {successResponse,internalServer,badRequest}=require('../../utilities/response/index');
const {getAllStudentsService,getAllStaffService,updateStaffCtrlService}=require('./service');
const getAllStudentsCtrl=async(req,res)=>{
try {
    const result=await getAllStudentsService(req.query);
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
const getAllStaffCtrl=async(req,res)=>{
    try {
        const result=await getAllStaffService(req);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error in getAllStaffCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in getAllStaffCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}
const updateStaffCtrl=async(req,res)=>{
    try {
        const result=await updateStaffCtrlService(req.body);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error in updateStaffCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in updateStaffCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

module.exports={
    getAllStudentsCtrl,
    getAllStaffCtrl,
    updateStaffCtrl
}