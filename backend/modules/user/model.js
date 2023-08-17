const { Schema, model } = require("mongoose");
const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String
    },
    hostelName: {
        type: String
    },
    roomNo:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['student', 'staff','admin'],
        required:true
    },
    empNo:{
        type:String
    },
    assignedHostel:{
        type:String
    },
    serviceProvider:{
        type:String
    }
});
const user = model("user", userSchema);
module.exports = user;