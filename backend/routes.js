const express=require('express');
const router=express.Router();


const loginRouter=require('./modules/login/index');
router.use("/user",loginRouter);


module.exports=router;