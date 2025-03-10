const mongoose = require("mongoose");

var prodSchema = mongoose.Schema({catid:{type:mongoose.Schema.Types.ObjectId,ref:"category"},subcatid:{type:mongoose.Schema.Types.ObjectId,ref:"subcategory"},prodname:String,description:String,Rate:Number,Discount:Number,Stock:Number,featured:String,picture:String,addedon:String},{versionKey:false})
module.exports= mongoose.model('product',prodSchema,"product");  //modelname,schema,collection name