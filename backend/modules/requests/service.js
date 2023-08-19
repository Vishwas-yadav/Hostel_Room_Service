const login=require('../login/model');
const user=require('../user/model');
const request=require('./model');

const serviceRequestService=async(params)=>{
    try {
        let {serviceType,serviceDescription,preferedDate,preferedTimeFrom,preferedTimeTo,userid}=params;
        if(!serviceType || !preferedDate || !preferedTimeFrom || !preferedTimeTo || !userid){
            throw{
                kn:true,
                msg:{
                    err: "Registration params missing"
                }
            }
        }
        let student=await user.findById(userid);
        let saveObj={
            roomNo:student.roomNo,
            hostelName:student.hostelName,
            serviceType:serviceType,
            preferedDate:preferedDate,
            serviceDescription:serviceDescription,
            preferedTimeFrom:preferedTimeFrom,
            preferedTimeTo:preferedTimeTo,
            requester:userid
        }
        const newReq=new request(saveObj);
        await newReq.save((err,res)=>{
            if (err) {
                throw err;
            }
        });
        return {
            msg:"Request For Service submitted successfully!"
        }
    } catch (error) {
        console.log("Error in serviceRequestService:", error);
    throw error;
    }
}


module.exports={
    serviceRequestService
}