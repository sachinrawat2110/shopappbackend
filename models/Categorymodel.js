const mongoose = require("mongoose");
var catSchema = mongoose.Schema({catname:String,catpic:String,disporder:Number},{versionKey:false})
module.exports = mongoose.model('category',catSchema,"category");  //modelname,schema,collection name