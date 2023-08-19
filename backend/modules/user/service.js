const user = require('./model');
const login = require('../login/model');
const getAllStudentsService = async (params) => {
    try {
        console.log('query here::', params);
        let { skip, limit,search } = params;
        console.log("skip:",skip,"limit:",limit,"search:",search);

        const filter = { role: "student" };
        let userFound=await user.find(filter);
        // console.log("count::::",userFound.length);
        let list = await user.aggregate([
            {
                $lookup:
                {
                    from: 'logins',
                    localField: '_id',
                    foreignField: 'userid',
                    as: "logined"
                }

            },
            {
                $match: filter
            },
            { $match: {$or:[{name: new RegExp(search,'i')},{rollNo: new RegExp(search,'i')}]} },
            { $sort: {_id:-1} },
            { $skip: Number.parseInt(skip) },
            { $limit: Number.parseInt(limit) }
        ]);
        // console.log("cnt:",list.length);

        let result = {
            res: {...list,total:list.length,allcnt:userFound.length},
            msg: 'fetched List',
        };
        return result;
    } catch (error) {
        console.log("Error ingetAllStudentsService:", error);
        throw error;
    }
}
const getAllStaffService=async(params)=>{
    try {
        const filter = { role: "staff" };
        let userFound=await user.find(filter);
        return{
            res:userFound,
            msg:"Found successfully"
        }
    } catch (error) {
        console.log("Error ingetAllStudentsService:", error);
        throw error;
    }
}
const updateStaffCtrlService=async(params)=>{
    try {
        let {id,assignedHostel,serviceProvider }=params;
        let update={
            assignedHostel:assignedHostel,
            serviceProvider:serviceProvider
        }
        let value=await user.findByIdAndUpdate(id,update);
        return{
            msg:"Assigned Successfully!"
        }
    } catch (error) {
        console.log("Error updateStaffCtrlService:", error);
        throw error;
    }
}
module.exports = {
    getAllStudentsService,
    getAllStaffService,
    updateStaffCtrlService
}