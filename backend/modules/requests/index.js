const {Router}=require("express");
const requestRouter = Router();
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {serviceRequestCtrl}=require('./controller');
requestRouter.post('/service-request',serviceRequestCtrl);

module.exports=requestRouter;