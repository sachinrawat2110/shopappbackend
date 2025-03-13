const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const signupRoutes = require('./routes/signupRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcatroutes = require('./routes/Subcatroutes');
const productroutes = require('./routes/ProductRoutes');
const Resetpassroutes = require('./routes/ResetPassRoutes');
const CartRoutes = require('./routes/CartRoutes');
const OrderRoutes = require('./routes/OrderRoutes');

const cors = require('cors');
const app = express();

dotenv.config();

app.use(cors({
    origin: 'https://your-frontend-url.onrender.com',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', signupRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcatroutes);
app.use('/api', productroutes);
app.use('/api', Resetpassroutes);
app.use('/api', CartRoutes);
app.use('/api', OrderRoutes);


const port=9000

mongoose.connect('mongodb+srv://shopappdbuser:Passw123@cluster0.n6esa.mongodb.net/shopdb?retryWrites=true&w=majority&appName=Cluster0').then(()=>
{
    console.log("Connected to mongodb")
}).catch((err)=>
{
    console.log("error in connecting" +err);
})

// mongoose.connect('mongodb://127.0.0.1:27017/shopdb').then(()=>
// {
//     console.log("Connected to mongodb")
// }).catch((err)=>
// {
//     console.log("error in connecting" +err);
// })

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 465,
//   secure: true, // true for port 465, false for other ports
//   auth: {
//     user : `${process.env.SMTP_UNAME}`,
//     pass : `${process.env.SMTP_PASS}`
//   },
// });

// function verifytoken(req,res,next)
// {
//   if(!req.headers.authorization)
//   {
//     return res.status(401).send('Unauthorized Subject')
//   }
//   let token = req.headers.authorization.split(' ')[1]
//   if(token=='null')
//   {
//     return res.status(401).send('Unauthorized request')
//   }
//   try 
//   {
//     const payload = jwt.verify(token, process.env.TSECRETKEY);
//     console.log(payload)
//     if(!payload)
//     {
//       return res.status(401).send('Unauthorized Request')
//     }
//     req.user = payload;//id,role
//     next();
//   } 
//   catch (err) 
//   {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// }

// const verifyAdmin = (req, res, next) => 
// {
//   if (req.user.role !== "admin") 
//   {
//     return res.status(403).json({ message: "Access Denied: Admins only" });
//   }
//   else
//   {
//     next();
//   }
// };

// var signupSchema=mongoose.Schema({name:String,phone:String,emailid:{type:String,unique:true},password:String,usertype:String, isActivated:Boolean,token:String},{versionkey:false})
// const Registermodel=mongoose.model('Signup',signupSchema,"Signup");
//                               //   modelName,Schema,collectionName

//   const hexToBuffer = (hex) =>
//   Buffer.from(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

// // Decrypt function
// const decryptPassword = (encryptedData, iv) => 
// {
//   const decipher = crypto.createDecipheriv("aes-128-cbc", Buffer.from(SECRET_KEY), hexToBuffer(iv));
//   let decrypted = decipher.update(hexToBuffer(encryptedData));
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// };

// // app.post("/api/signup",async(req,res)=>
// // {
// //     try{
// //     const { pass, iv } = req.body;
// //     const decryptedPassword = decryptPassword(pass, iv);

// //     const hash = bcrypt.hashSync(decryptedPassword, 10);
// //       const acttoken=uuidv4(); 
// //      const newRecord =new Registermodel({name:req.body.pname,phone:req.body.phone,emailid:req.body.email,password:hash,
// //       usertype:"normal",isActivated:false,token:acttoken});
// // //     newRecord.save().then(()=>res.send({msg:"signup Done"}))
// // // .catch(()=>res.send({msg:"error in signing"}));
// //    const result= await newRecord.save();
// //    if(result)
// //    {
// //      const mailOptions = 
// //      {
// //        from: 'class@gtbinstitute.com',
// //        to: req.body.email,
// //        subject: 'Account Activation Mail from ShoppingPoint.com',
// //        html: `Dear ${req.body.pname}<br/><br/>Thanks for signing up on our website. You can activate your account by clicking on the following link:-<br/><br/> <a href='http://localhost:3000/activate?token=${acttoken}'>Acivate Account</a><br/><br/>Team ShoppingPoint.com`
// //      };
// //      transporter.sendMail(mailOptions, (error, info) => 
// //      {
// //        if (error) 
// //        {
// //          res.send({code:2})
// //          console.log(error);
// //          res.send('Error sending email');
// //        } 
// //        else 
// //        {
// //          console.log('Email sent: ' + info.response);
// //          res.send({code:1})
// //        }
// //      });
// //    }
// //    else
// //    {
// //      res.json({code:0})
// //    }
// //  }
// //  catch(e)
// //  {
// //    res.send({code:-1,errmsg:e.message})
// //    console.log(e.message);
// //  }
// // })

//         app.post("/api/createadmin", verifytoken,async(req,res)=>
// {
//     try{
//     const newRecord =new Registermodel({name:req.body.pname,phone:req.body.phone,emailid:req.body.email,password:req.body.pass,usertype:"admin"});
// //     newRecord.save().then(()=>res.send({msg:"signup Done"}))
// // .catch(()=>res.send({msg:"error in signing"}));
//    const result= await newRecord.save();
//        if(result)
//        {
//         res.send({code:1})
//        }
//        else
//        {
//         res.json({code:0})
//        }
// }
//         catch(e)
//         {
//             res.status(500).send(e.message)
//             console.log(e.message);
//         }
//         })

//         app.post("/api/login",async(req,res)=>
//         {
//       try
//       {
//       const result= await Registermodel.findOne({emailid:req.body.uname})
//       if(result)
//     {
//       if(bcrypt.compareSync(req.body.pass, result.password))
//       {
//         const respdata = {name:result.name,emailid:result.emailid,usertype:result.usertype,isActivated:result.isActivated}
//         let jtoken = jwt.sign({id: result._id,role:result.usertype}, process.env.TSECRETKEY , { expiresIn: '1h' });
//         res.send({code:1,membdata:respdata,jstoken:jtoken})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//         else
//         {
//             res.send({code:0})  
//         }
//     }
//     catch(e)
//     {
//           res.send({code:-1,err:e.message})
//     }
//   })


//   app.get("/api/search",verifytoken,verifyAdmin,async(req,res)=>
//     {
//         try
//     {
//       const result= await Registermodel.findOne({emailid:req.query.un})
//       if(result)
//       {
//         res.send({code:1,membdata:result})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     catch(e)
//     {
//         res.send({code:-1,errmsg:e.message})
//     }
//     })


//    app.get("/api/alluser",async(req,res)=>
//    {
//     try
//     {
//        const result=await Registermodel.find()
//        if(result.length>0)
//        {
//         res.send({code:1,membsdata:result})
//        }
//        else
//        {
//         res.send({code:0})
//        }
//     }
//     catch(e)
//     {
//        res.send({code:-1,errmsg:e.message})
//     }
//    })

// app.delete(`/api/deluser`,async(req,res)=>
// {
//     try
//     {
//         const result=await Registermodel.deleteOne({_id:req.query.uid})
//         console.log(result)
//         if(result.deletedCount===1)
//         {
//             res.send({code:1})
//         }
//         else
//         {
//             res.send({code:0})
//         }
//     }
//     catch(e)
//     {
//         res.send({code:-1,errmsg:e.message})
//     }
// })

// var catSchema = mongoose.Schema({catname:String,catpic:String,disporder:Number},{versionKey:false})
// const CatModel = mongoose.model('category',catSchema,"category");  //modelname,schema,collection name

// app.post("/api/category",upload.single('cpic'),verifytoken,verifyAdmin,async(req,res)=>
// {
//   try
//   {
//     var picname=`nopic.jpg`;
//     if(req.file)
//     {
//       picname=req.file.filename;
//     }
//     const newRecord = new CatModel({catname:req.body.cname,catpic:picname,disporder:req.body.disporder});
//     const result = await newRecord.save();
//     if(result)
//     {
//       res.send({code:1})
//     }
//     else
//     {
//       res.json({code:0})
//     }
//   }
//   catch(e)
//   {
//     res.send({code:-1,errmsg:e.message})
//     console.log(e.message);
//   }
// })

// app.get("/api/getallcat",async(req,res)=>
//   {
//     try
//     {
//       const result = await CatModel.find()
//       if(result.length>0)
//       {
//         res.send({code:1,catdata:result})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//     }
//   })

//   app.delete("/api/delcat",async(req,res)=>
//     {
//       try
//       {
//         const result = await CatModel.deleteOne({_id:req.query.cid})
//         console.log(result)
//         if(result.deletedCount===1)
//         {
//           res.send({code:1})
//         }
//         else
//         {
//           res.send({code:0})
//         }
//       }
//       catch(e)
//       {
//         res.send({code:-1,errmsg:e.message})
//       }
//     })

//     app.put("/api/updatecat",upload.single(`cpic`),async(req,res)=>
//     {
//       try
//       { 
//         var picname;
//         if(req.file)
//         {
//           picname=req.file.filename;
//           if(req.body.oldpicname!==`nopic.jpg`)
//           {
//             fs.unlinkSync(`${uploadpath}/${req.body.oldpicname}`);
//           }
//         }
//           else
//           {
//             picname=req.body.oldpicname;
//           }
//         const result=await CatModel.updateOne({_id:req.body.cid},{catname:req.body.cname,catpic:picname,disporder:req.body.disporder})
//          console.log(result);
//         if(result.modifiedCount===1)
//         {
//           res.send({code:1})
//         }
//         else
//         {
//           res.send({code:0})
//         }
//       }
//       catch(e)
//       {
//         res.send({code:-1,errmsg:e.message})
//         console.log(e.message);
//       }
//     })

// var subCatSchema=mongoose.Schema({catid: {type:mongoose.Schema.Types.ObjectId,ref:`category`},subcatname:String,subcatpic:String,disporder:Number},{versionKey:false})
// const SubCatModel=mongoose.model(`subcategory`,subCatSchema,`subcategory`) //modelname,schema,collection name

// app.post(`/api/savesubcategory`,upload.single(`scpic`),async(req,res)=>
// {
//   try
//   {
//     var picname=`nopic.jpg`
//     if(req.file)
//     {
//      picname=req.file.filename 
//     }

//     const newRecord= new SubCatModel({catid:req.body.cid,subcatname:req.body.scname,subcatpic:picname,disporder:req.body.disporder});
//     const result= await newRecord.save(); 
    
//     if(result)
//     {
//       res.send({code:1})
//     }
//     else
//     {
//       res.send({code:0})
//     }
//   }
//   catch(e)
//   {
//     res.send({code:-1,errmsg:e.message})
//     console.log(e);
//   }
// })

// app.get(`/api/getsubcatbycatid/:cid`,async(req,res)=>
// {
//   try
//   {
//     const result=await SubCatModel.find({catid:req.params.cid}).populate(`catid`,`catname`)
//                                                      //Field from u get anything //what you want column name
//     if(result.length>0)
//     {
//       res.send({code:1,subcatdata:result})
//     }
//     else
//     {
//       res.send({code:0})
//     }
//   }
//   catch(e)
//   {
//    res.send({code:-1,errmsg:e.message})
//   }
// })

//   app.put(`/api/updatesubcat`,upload.single(`scpic`),async(req,res)=>
//   {
//     try
//     {
//         var picname;
//         if(req.file)
//         {
//           picname=req.file.filename;
//           if(req.body.oldpicname!==`nopic.jpg`)
//           {
//             fs.unlinkSync(`${uploadpath}/${req.body.oldpicname}`);
//           }
//         }
//         else
//         {
//           picname=req.body.oldpicname;
//         }
//         const result=await SubCatModel.updateOne({_id:req.body.scid},{catid:req.body.cid,subcatname:req.body.scname,
//           subcatpic:picname,disporder:req.body.disporder})
//           if(result.modifiedCount===1)
//           {
//             res.send({code:1})
//           }
//           else
//           {
//             res.send({code:0})
//           }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//     }
//   })

//   app.delete("/api/delsubcat/:scid",async(req,res)=>
//   {
//     try
//     {
//       const result = await SubCatModel.deleteOne({_id:req.params.scid})
//       console.log(result)
//       if(result.deletedCount===1)
//       {
//         res.send({code:1})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//     }
//   })

//   var prodSchema = mongoose.Schema({catid:{type:mongoose.Schema.Types.ObjectId,ref:"category"},subcatid:{type:mongoose.Schema.Types.ObjectId,ref:"subcategory"},prodname:String,description:String,Rate:Number,Discount:Number,Stock:Number,featured:String,picture:String,addedon:String},{versionKey:false})

// const ProdModel = mongoose.model('product',prodSchema,"product");  //modelname,schema,collection name

// app.post("/api/saveproduct",upload.single('ppic'),async(req,res)=>
//   {
//     try
//     {
//       var picname="nopic.jpg";
//       if(req.file)
//       {
//           picname=req.file.filename;
//       }
  
//       const newRecord = new ProdModel({catid:req.body.cid,subcatid:req.body.scid,prodname:req.body.pname,description:req.body.description,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,featured:req.body.feat,picture:picname,addedon:new Date()});

//       const result = await newRecord.save();
//       if(result)
//       {
//         res.send({code:1})
//       }
//       else
//       {
//         res.json({code:0})
//       }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//       console.log(e);
//     }
//   })

//   app.get("/api/getprodsbysubcat/:scid",async(req,res)=>
//   {
//     try
//     {
//       const result = await ProdModel.find({subcatid:req.params.scid}).populate(`subcatid`,`subcatname`)
//       // console.log(result)
//       if(result.length>0)
//       {
//         res.send({code:1,productsdata:result})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//     }
//   })

//   app.get("/api/getproddetails/:pid",async(req,res)=>
//   {
//     try
//     {
//       const result = await ProdModel.findOne({_id:req.params.pid}).populate(`subcatid catid`,`subcatname catname`)
//       if(result)
//       {
//         res.send({code:1,proddata:result})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//     }
//   })


//   app.put("/api/updateproduct",upload.single('ppic'),async(req,res)=>
//   {
//     try
//     {
//       var picname;
//       if(req.file) // it shows that there is a file in the request and admin wants to change the image
//       {
//           picname=req.file.filename;
//           if(req.body.oldpicname!=="nopic.jpg")
//           {
//             fs.unlinkSync(`${uploadpath}/${req.body.oldpicname}`);
//           }
//       }
//       else
//       {
//         picname=req.body.oldpicname;
//       }
//       const result = await ProdModel.updateOne({_id:req.body.pid},{catid:req.body.cid,subcatid:req.body.scid,prodname:req.body.pname,description:req.body.description,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,featured:req.body.feat,picture:picname})
//       console.log(result)
//       if(result.modifiedCount===1)
//       {
//         res.send({code:1})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//     }
//   })

//   app.delete("/api/delprod/:pid",async(req,res)=>
//   {
//     try
//     {
//       const result = await ProdModel.deleteOne({_id:req.params.pid})
//       console.log(result)
//       if(result.deletedCount===1)
//       {
//         res.send({code:1})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//     }
//   })

//   app.put("/api/changepass",verifytoken,async(req,res)=>
//   {
//       try
//       {
//           const result= await Registermodel.findOne({emailid:req.body.uname})
//           if(result)
//           {
//             if(bcrypt.compareSync(req.body.currpass,result.password))
//             {
//               const hash=bcrypt.hashSync(req.body.newpass,10);
//               const result2=await Registermodel.updateOne({emailid:req.body.uname},{password:hash})
//               if(result2.modifiedCount===1)
//               {
//                 res.send({code:1})
//               }
//             }
//             else
//             {
//                 res.send({code:2})  
//             }
//           }
//           else
//           {
//               res.send({code:0})  
//           }
//       }
//       catch(e)
//       {
//            res.send({code:-1,err:e.message})
//       }
//   })

//   var resetPasswordSchema = new mongoose.Schema({emailid:String,token:String,exptime:String}, { versionKey: false } );
//   var resetpassModel = mongoose.model("resetpass",resetPasswordSchema,"resetpass");

//   app.get('/api/forgotpass/:uname', async (req, res) => 
// {
//   try
//   {
//     const userdata = await Registermodel.findOne({ emailid: req.params.uname });
//     if (!userdata) 
//     {
//       return res.send({code:0});
//     }
//     else
//     {
//       var resettoken = uuidv4();
//       var minutesToAdd=15;
//       var currentDate = new Date();//current date and time
//       var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);//current millsecs+15 mins millsecs
  
//       var newreset = new resetpassModel({emailid:req.params.uname,token:resettoken,exptime:futureDate});
//       let saveresult = await newreset.save();
  
//       if(saveresult)
//       {
//         const mailOptions = 
//         {
//           from: 'class@gtbinstitute.com',
//           to: req.params.uname,
//           subject: 'Reset your password::ShoppingPoint.com',
//           html: `Hi ${userdata.name},<br/><br/> Please click on the following link to reset your password: <br/><br/>
//           <a href='http://localhost:3000/resetpassword?token=${resettoken}'>Reset Password</a>`
//         };
//         // Use the transport object to send the email
//         transporter.sendMail(mailOptions, (error, info) => 
//         {
//           if (error) 
//           {
//             console.log(error);
//             res.status(200).send({code:2});
//           } 
//           else 
//           {
//             console.log('Email sent: ' + info.response);
//             res.status(200).send({code:1});
//           }
//         });
//       }
//       else
//       {
//         res.send({msg:"Error, try again"});
//       }
//     }
//   }
//   catch(e)
//   {
//     res.send({code:-1,errmsg:e.message})
//   }
// });

// app.get("/api/checktoken",async(req,res)=>
// {
//   try
//   {
//     const result = await resetpassModel.findOne({token:req.query.token})
//     if(result)
//     {
//       const currtime = new Date();
//       const exptime = new Date(result.exptime);
//       if(currtime<exptime)
//       {
//         res.send({code:1,passdata:result})
//       }
//       else
//       {
//         res.send({code:2})
//       }
//     }
//     else
//     {
//       res.send({code:0})
//     }
//   }
//   catch(e)
//   {
//     res.send({code:-1,errmsg:e.message})
//   }
// })

// app.put("/api/resetpass",async(req,res)=>
// {
//   try
//   {
//     const hash = bcrypt.hashSync(req.body.newpass, 10);
//     const result = await Registermodel.updateOne({emailid:req.body.uname},{password:hash})
//     if(result.modifiedCount===1)
//     {
//       res.send({code:1})
//     }
//     else
//     {
//       res.send({code:0})
//     }
//   }
//   catch(e)
//   {
//     res.send({code:-1,errmsg:e.message})
//   }
// })


//   var cartSchema = mongoose.Schema({prodid: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },picture:String,prodname:String,rate:Number,qty:Number,totalcost:Number,emailid:String},{versionKey:false})

// const CartModel = mongoose.model('cart',cartSchema,"cart");  //modelname,schema,collection name

// app.post("/api/addtocart",async(req,res)=>
// {
//   try
//   {
//     const result1 = await CartModel.findOne({prodid:req.body.prodid,emailid:req.body.uname});
//     if(result1)
//     {
//       const newqty = Number(result1.qty)+Number(req.body.qty);//oldqty+newqty
//       const newtotalcost = Number(req.body.rate)*Number(newqty);
//       const updateresult = await CartModel.updateOne({prodid:req.body.prodid,emailid:req.body.uname},{qty:newqty,totalcost:newtotalcost})
//       if(updateresult.modifiedCount===1)
//       {
//         res.send({code:1})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     else
//     {
//       const newRecord = new CartModel({prodid:req.body.prodid,picture:req.body.pic,prodname:req.body.pname,rate:req.body.rate,qty:req.body.qty,totalcost:req.body.tc,emailid:req.body.uname});

//       const result2 = await newRecord.save();
//       if(result2)
//       {
//         res.send({code:1})
//       }
//       else
//       {
//         res.json({code:0})
//       }
//     }
   
//   }
//   catch(e)
//   {
//     res.send({code:-1,errmsg:e.message})
//   }
// })

// app.get("/api/getusercart/:uname", async (req, res) => 
// {
//   try 
//   {
//     const result = await CartModel.find({ emailid:req.params.uname })
//     if (result.length > 0) 
//     {
//       res.send({ code: 1, usercart: result });
//     } 
//     else 
//     {
//       res.send({ code: 0});
//     }
//   } 
//   catch (e) 
//   {
//     res.send({ code: -1, errmsg: e.message });
//   }
// });

// app.delete("/api/delcartitem",async(req,res)=>
//   {
//     try
//     {
//       const result = await CartModel.deleteOne({_id:req.query.id})
//       console.log(result)
//       if(result.deletedCount===1)
//       {
//         res.send({code:1})
//       }
//       else
//       {
//         res.send({code:0})
//       }
//     }
//     catch(e)
//     {
//       res.send({code:-1,errmsg:e.message})
//     }
//   })

//   var orderSchema = mongoose.Schema({emailid:String,address:String,pmode:String,cardetails:Object,orderdt:Date,billamt:Number,items:[Object],status:String},{versionKey:false})

//   const OrderModel = mongoose.model('order',orderSchema,"order");  //modelname,schema,collection name
  
//   app.post("/api/saveorder",async(req,res)=>
//     {
//       try
//       {
//         var orditems = req.body.orderitems;
//         for(var x=0;x<orditems.length;x++)
//         {
//           const updateresult = await ProdModel.updateOne({_id:orditems[x].prodid},{$inc:{"Stock":-orditems[x].qty}})
//         }
  
//         const newRecord = new OrderModel({emailid:req.body.uname,address:req.body.addr,pmode:req.body.pmode,cardetails:req.body.carddetails,orderdt:new Date(),billamt:req.body.tbill,items:req.body.orderitems,status:"Order Received, Processing"});
  
//         const result = await newRecord.save();
//         if(result)
//         {
//           const delresult = await CartModel.deleteMany({emailid:req.body.uname})
//           res.send({code:1})
//         }
//         else
//         {
//           res.json({code:0})
//         }
//       }
//       catch(e)
//       {
//         res.send({code:-1,errmsg:e.message})
//         console.log(e);
//       }
//     })


//     app.get("/api/fetchorderdetails", async (req, res) => 
//   {
//     try 
//     {

//       const result = await OrderModel.findOne({emailid:req.query.un}).sort({"orderdt":-1})
//       if(result) 
//       {
//         res.send({ code: 1, orderdet: result });
//       } 
       
//     } 
//     catch (e) 
//     {
//       res.send({ code: -1, errmsg: e.message });
//     }

//   }); 

//   app.get("/api/searchprods/:text", async (req, res) => 
//   {
//     try 
//     {
//       var searchtext=req.params.text;
//       const result = await ProdModel.find({prodname: { $regex: '.*' + searchtext ,$options:'i' }})
//       if(result.length>0) 
//       {
//         res.send({ code: 1, productsdata: result });
//       } 
//       else 
//       {
//         res.send({ code: 0});
//       }
//     } 
//     catch (e) 
//     {
//       res.send({ code: -1, errmsg: e.message });
//     }
//   });

  // app.get("/api/getorders", async (req, res) =>                                    {simple}
  // {
  //   try 
  //   {
  //     const result = await OrderModel.find().sort({"orderdt":-1})
  //     if (result.length > 0) 
  //     {
  //       res.send({ code: 1, orddata: result });
  //     } 
  //     else 
  //     {
  //       res.send({ code: 0});
  //     }
  //   } 
  //   catch (e) 
  //   {
  //     res.send({ code: -1, errmsg: e.message });
  //   }
  // })

  // app.get("/api/getorders", async (req, res) =>                                   {Complexity}
  //   try {
  //     const inputDate = req.query.odt; // E.g., "2025-01-20"
  
  //     // Convert the input date to the start and end of the day
  //     const startOfDay = new Date(`${inputDate}T00:00:00.000Z`);
  //     const endOfDay = new Date(`${inputDate}T23:59:59.999Z`);
  
  //     // Query for records within the date range
  //     const result = await OrderModel.find({
  //       orderdt: { $gte: startOfDay, $lte: endOfDay }
  //     }).sort({ orderdt: -1 });
  
  //     if (result.length > 0) {
  //       res.send({ code: 1, orddata: result });
  //     } else {
  //       res.send({ code: 0 });
  //     }
  //   } catch (e) {
  //     res.send({ code: -1, errmsg: e.message });
  //   }
  // });

  // app.get("/api/getuserorders", async (req, res) => 
  // {
  //   try 
  //   {
  //     const result = await OrderModel.find({emailid:req.query.un}).sort({"orderdt":-1})
  //     if (result.length > 0) 
  //     {
  //       res.send({ code: 1, orddata: result });
  //     } 
  //     else 
  //     {
  //       res.send({ code: 0});
  //     }
  //   } 
  //   catch (e) 
  //   {
  //     res.send({ code: -1, errmsg: e.message });
  //   }
  // });

  // app.get("/api/getorderitems", async (req, res) => 
  // {
  //   try 
  //   {
  //     const result = await OrderModel.findOne({"_id":req.query.oid})
  //     if (result) 
  //     {
  //       res.send({ code: 1, itemsdata: result.items});
  //     } 
  //     else 
  //     {
  //       res.send({ code: 0});
  //     }
  //   } 
  //   catch (e) 
  //   {
  //     res.send({ code: -1, errmsg: e.message });
  //   }
  // });

  // app.put("/api/updatestatus",async(req,res)=>
  // {
  //   try
  //   {
  //     const result = await OrderModel.updateOne({_id:req.body.ordid},{status:req.body.newstatus})
  //     console.log(result)
  //     if(result.modifiedCount===1)
  //     {
  //       res.send({code:1})
  //     }
  //     else
  //     {
  //       res.send({code:0})
  //     }
  //   }
  //   catch(e)
  //   {
  //     res.send({code:-1,errmsg:e.message})
  //   }
  // })

  // app.post("/api/contactus",async(req,res)=>
  // {
  //   try
  //   {
  //     const mailOptions = 
  //     {
  //       from: 'class@gtbinstitute.com',//transporter username email
  //       to: 'gtbtrial@gmail.com',//any email id of admin or where you want to receive email
  //       replyTo: req.body.email,
  //       subject: 'Message from Website - Contact Us',
  //       html: `<b>Name:-</b> ${req.body.name}<br/><b>Phone:-</b> ${req.body.phone}<br/><b>Email:-</b> ${req.body.email}
  //       <br/><b>Message:-</b> ${req.body.msg}`
  //     };
  
  //     // Use the transport object to send the email
  //     transporter.sendMail(mailOptions, (error, info) => 
  //     {
  //       if (error) 
  //       {
  //         console.log(error);
  //         res.send('Error sending email');
  //       } 
  //       else 
  //       {
  //         console.log('Email sent: ' + info.response);
  //         res.send("Message sent successfully");
  //       }
  //     });
  //   }
  //   catch(e)
  //   {
  //     res.send({code:-1,errmsg:e.message})
  //   }
  // })

  


  //   var RnapSchema = mongoose.Schema({rollno:String,name:String,address:String,phone:String},{versionKey:false})
  //   const RnapModel = mongoose.model('Student',RnapSchema,"Students");  //modelname,schema,collection name
  //   app.post(`/api/Rnap`,async(req,res)=>
  //   {
  //     try
  //     {
  //        const newRecord= new RnapModel({rollno:req.body.rollno,name:req.body.name,address:req.body.address,phone:req.body.phone})
  //        const result=await newRecord.save();
  //        if(result)
  //        {
  //         res.send({code:1})
  //        }
  //        else
  //        {
  //         res.send({code:0})
  //        }
  //     }
  //     catch(e)
  //     {
  //        res.send({code:-1,errmsg:e.message})
  //     }
  //   })

  //  app.get(`/api/getallstudent`,async(req,res)=>
  //  {
  //   try
  //   {
  //     const result = await RnapModel.find()
  //     if(result.length>0)
  //     {
  //       res.send({code:1,studentdata:result})
  //     }
  //     else
  //     {
  //       res.send({code:0})
  //     }
  //   }
  //   catch(e)
  //   {
  //     res.send({code:-1,errmsg:e.message})
  //   }
  //  })

  //  app.delete("/api/delstd",async(req,res)=>
  //   {
  //     try
  //     {
  //       const result = await RnapModel.deleteOne({_id:req.query.std})
  //       console.log(result)
  //       if(result.deletedCount===1)
  //       {
  //         res.send({code:1})
  //       }
  //       else
  //       {
  //         res.send({code:0})
  //       }
  //     }
  //     catch(e)
  //     {
  //       res.send({code:-1,errmsg:e.message})
  //     }
  //   })

app.listen(port,()=> 
{
    console.log(`Server is running on ${port}`)
})
