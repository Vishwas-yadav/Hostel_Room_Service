const { Schema, model } = require("mongoose");
const loginSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role:{
        type:String
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        require:true
    },
    date: {
        type: Date,
        default: new Date(),
      }
});
const login = model("login", loginSchema);
module.exports = login;