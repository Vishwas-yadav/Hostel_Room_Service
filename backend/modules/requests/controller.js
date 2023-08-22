const {successResponse,internalServer,badRequest}=require('../../utilities/response/index');
const {serviceRequestService,getServiceResquestByIdService,deleteReqByIdService,getStaffTasksByIdService,setPendingStatusToFalseByRequestId}=require('./service');

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
const getServiceResquestByRqIdCtrl=async(req,res)=>{
    try {
        const result=await getServiceResquestByIdService(req.params);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error in getServiceResquestByRqIdCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in getServiceResquestByRqIdCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}
const deleteReqByIdCtrl=async(req,res)=>{
    try {
        const result=await deleteReqByIdService(req.params);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error indeleteReqByIdCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in deleteReqByIdCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

const getStaffTasksByIdCtrl=async(req,res)=>{
    try {
        const result=await getStaffTasksByIdService(req.params);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error getStaffTasksByIdCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in getStaffTasksByIdCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}
const setPendingStatusToFalseByRequestIdCTRL=async(req,res)=>{
    try {
        const result=await setPendingStatusToFalseByRequestId(req.params);
        successResponse(res,result);
    } catch (error) {
        if (error.kn) {
            console.log("Known error setPendingStatusToFalseByRequestIdCTRL:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in setPendingStatusToFalseByRequestIdCTRL:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

module.exports={
    serviceRequestCtrl,
    getServiceResquestByRqIdCtrl,
    deleteReqByIdCtrl,
    getStaffTasksByIdCtrl,
    setPendingStatusToFalseByRequestIdCTRL
}