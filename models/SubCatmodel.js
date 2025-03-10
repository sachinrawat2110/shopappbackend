const mongoose = require("mongoose");
var subCatSchema=mongoose.Schema({catid: {type:mongoose.Schema.Types.ObjectId,ref:`category`},subcatname:String,subcatpic:String,disporder:Number},{versionKey:false})
module.exports=mongoose.model(`subcategory`,subCatSchema,`subcategory`) //modelname,schema,collection name