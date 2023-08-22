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

const getServiceResquestByIdService=async(params)=>{
    try {
        let {id}=params;
        let requestEntry=await request.find({requester:id,pendingStatus:true}).sort({_id:-1});
        return{
            res:requestEntry,
            msg:"Fetched successfuly!"
        }
    } catch (error) {
        console.log("Error in getServiceResquestByIdService:", error);
    throw error;
    }
}
const deleteReqByIdService=async(params)=>{
    try {
        let {id}=params;
        await request.findByIdAndDelete(id);
        return{
            msg:"deleted Service Request!"
        }
    } catch (error) {
        console.log("Error in deleteReqByIdService:", error);
    throw error;
    }
}

const getStaffTasksByIdService=async(params)=>{
    try {
        let {id}=params;
        let staff=await user.findById(id);
        let filter={
            hostelName:staff.assignedHostel,
            serviceType:staff.serviceProvider,
            pendingStatus:true
        };
        let taskList=await request.find(filter);
        return{
            res:taskList,
            msg:"Fetched Successfully!"
        }

    } catch (error) {
        console.log("Error in getStaffTasksByIdService:", error);
    throw error;
    }
}

const setPendingStatusToFalseByRequestId=async(params)=>{
    try {
        let {id}=params;
        let updateVal={
            pendingStatus:false
        };
        await request.findByIdAndUpdate(id,updateVal);
        return {
            msg:"Updated Successfully!"
        }
    } catch (error) {
        console.log("Error in setPendingStatusToFalseByRequestId:", error);
        throw error;
    }
}


module.exports={
    serviceRequestService,
    getServiceResquestByIdService,
    deleteReqByIdService,
    getStaffTasksByIdService,
    setPendingStatusToFalseByRequestId
}