const express=require('express');
const router=express.Router();
const loginRouter=require('./modules/login/index');
const userRouter=require('./modules/user/index');
const requestRouter=require('./modules/requests/index');

router.use("/user",loginRouter);
router.use("/details",userRouter);
router.use("/request",requestRouter);

module.exports=router;