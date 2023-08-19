const {Router}=require("express");
const userRouter = Router();
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {getAllStudentsCtrl,getAllStaffCtrl,updateStaffCtrl} =require('./controller');

userRouter.get('/all-student',getAllStudentsCtrl);
userRouter.get('/all-staff',getAllStaffCtrl);
userRouter.post('/update-staff-by-id',updateStaffCtrl);
module.exports=userRouter;