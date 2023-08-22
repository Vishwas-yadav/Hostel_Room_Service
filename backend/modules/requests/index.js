const {Router}=require("express");
const requestRouter = Router();
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {serviceRequestCtrl,getServiceResquestByRqIdCtrl,deleteReqByIdCtrl,getStaffTasksByIdCtrl,setPendingStatusToFalseByRequestIdCTRL}=require('./controller');

requestRouter.post('/service-request',authenticate(),serviceRequestCtrl);
requestRouter.get('/requester-id/:id',authenticate(),getServiceResquestByRqIdCtrl);
requestRouter.delete('/delete-by-id/:id',authenticate(),deleteReqByIdCtrl);
requestRouter.get('/tasks-list/:id',authenticate(),getStaffTasksByIdCtrl);
requestRouter.get('/setRequestDone/:id',authenticate(),setPendingStatusToFalseByRequestIdCTRL)
module.exports=requestRouter;