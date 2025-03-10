const mongoose = require("mongoose");
var cartSchema = mongoose.Schema({prodid: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },picture:String,prodname:String,rate:Number,qty:Number,totalcost:Number,emailid:String},{versionKey:false})
module.exports =  mongoose.model('cart',cartSchema,"cart");  //modelname,schema,collection name