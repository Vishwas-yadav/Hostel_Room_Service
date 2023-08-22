const {Router}=require("express");
const userRouter = Router();
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {getAllStudentsCtrl,getAllStaffCtrl,updateStaffCtrl} =require('./controller');

userRouter.get('/all-student',authenticate(),getAllStudentsCtrl);
userRouter.get('/all-staff',authenticate(),getAllStaffCtrl);
userRouter.post('/update-staff-by-id',authenticate(),updateStaffCtrl);
module.exports=userRouter;