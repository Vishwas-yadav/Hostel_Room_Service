const login=require('./model');
const user=require('../user/model');
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcryptjs"));
const {getJwtToken}=require('../../utilities/authentication/token');

const registerUserService=async(params)=>{
    try {
        let {email,password,role,name,rollNo,hostelName,roomNo, empNo,assignedHostel,serviceProvider}=params;
        if(!email || !password || !role || !name){
            throw{
                kn:true,
                msg:{
                    err: "Registration params missing"
                }
            }
        }
        if(role==="student"){
            if(!rollNo || !hostelName || !roomNo){
                throw{
                    kn:true,
                    msg:{
                        err: "Registration params missing"
                    }
                }
            }
        }else if(role==="staff"){
            if(!empNo){
                throw{
                    kn:true,
                    msg:{
                        err: "Registration params missing"
                    }
                }
            }
        }

        
        const userAny=await login.findOne({email:email});
        if(userAny){
            throw{
                kn:true,
                msg:{
                    err: "Email already registerd"
                }
            }
        }

        //check if role='student' then set default isActive=false...coz admin will grant access..
        let isActive=true;
        if(role=='student')
        isActive=false;

        const newUser=new user({
            name:name,
            rollNo:rollNo?rollNo:"",
            hostelName:hostelName?hostelName:"",
            roomNo:roomNo?roomNo:"",
            email:email,
            role:role,
            empNo:empNo?empNo:"",
            assignedHostel:assignedHostel?assignedHostel:"",
            serviceProvider:serviceProvider?serviceProvider:""
        });
        await newUser.save((err, res) => {
            if (err) {
                throw err;
            }
        });



       
        const newLogin=new login({
            email:email,
            password:password,
            role:role,
            isActive:isActive,
            userid:newUser._id,
            name:name
        })

        
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(newLogin.password,salt);
        newLogin.password=hash;


    
        await newLogin.save((err, res) => {
            if (err) {
                throw err;
            }
        });

        const payload={
            name:newLogin.name,
            userid:newLogin.userid,
            email:newLogin.email,
            role:newLogin.role,
            isActive:newLogin.isActive,
            id:newLogin._id
        }
        console.log("user registed successfully!!!");
        let jwtResult = await getJwtToken(payload);

        const result={
            res:jwtResult,
            msg:"User registerd successfully!"
        }
        return result;

    } catch (error) {
        console.log("Error in Register User Service:", error);
    throw error;
    }
}

const authUserService=async(params)=>{
    try {
        let {email,password}=params;
        if(!email || !password){
            throw{
                kn:true,
                msg:{
                    err: "Login params missing"
                }
            }
        }
        const user = await login.findOne({ email: email });
        if (!user) {
            throw {
                kn: true,
                msg: {
                    err: 'No User Found: Email not registered!'
                }
            }
        }

        console.log("USER OBJ::", user);
        const isMatched = await bcrypt.compare(password, user.password);
        if(isMatched){
            const payload = {
                name:user.name,
                userid:user.userid,
                email:user.email,
                role:user.role,
                isActive:user.isActive,
                id:user._id
            };
            console.log("PAYLOAD:", payload);
            if(user.role==='student' && user.isActive==false){
                throw {
                    kn: true,
                    msg: {
                        err: 'Account yet not approved! Will be approved by administration soon'
                    }
                }
            }else{
                let jwtResult = await getJwtToken(payload);
                result = {
                    res: jwtResult,
                    msg: 'login successfull!',
                };
            }
            
            return result;
        }else{
            throw {
                kn: true,
                msg: {
                    err: 'PASSWORD INCORRECT'
                }
            }
        }



    } catch (error) {
        console.log("Error in Login Auth Service:", error);
    throw error;
    }
}
module.exports={
    registerUserService,
    authUserService
}