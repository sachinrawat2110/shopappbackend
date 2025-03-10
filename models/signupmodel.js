const mongoose = require("mongoose");

var signupSchema=mongoose.Schema({name:String,phone:String,emailid:{type:String,unique:true},password:String,usertype:String,isActivated:Boolean,token:String},{versionkey:false})
module.exports = mongoose.model('Signup',signupSchema,"Signup");