const { Schema, model } = require("mongoose");
const requestSchema = Schema({
    serviceType: {
        type: String,
        required: true
    },
    serviceDescription: {
        type: String
    },
    preferedDate: {
        type: String
    },
    preferedTimeFrom:{
        type:String
    },
    preferedTimeTo:{
        type:String
    },
    hostelName:{
        type:String
    },
    roomNo:{
        type:String
    },
    requester:{
        type:Schema.Types.ObjectId
    },
    pendingStatus:{
        type:Boolean,
        default:true
    },
    date: {
        type: Date,
        default: new Date(),
      }
});
const request = model("request", requestSchema);
module.exports = request;