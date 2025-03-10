const mongoose = require("mongoose");
var orderSchema = mongoose.Schema({emailid:String,address:String,pmode:String,cardetails:Object,orderdt:Date,billamt:Number,items:[Object],status:String},{versionKey:false})
module.exports =mongoose.model('order',orderSchema,"order");  //modelname,schema,collection name