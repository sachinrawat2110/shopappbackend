const Registermodel= require('../models/signupmodel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()

const crypto = require("crypto");
const SECRET_KEY = `${process.env.SECRETKEY}`; // Must be 16 bytes
const { sendMail } = require('../src/utils/mailer')
const { v4: uuidv4 } = require('uuid');

const hexToBuffer = (hex) =>
Buffer.from(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

// Decrypt function
const decryptPassword = (encryptedData, iv) => 
{
const decipher = crypto.createDecipheriv("aes-128-cbc", Buffer.from(SECRET_KEY), hexToBuffer(iv));
let decrypted = decipher.update(hexToBuffer(encryptedData));
decrypted = Buffer.concat([decrypted, decipher.final()]);
return decrypted.toString();
};

exports.Allsignup=async(req,res)=>
{
    try{
    const { pass, iv } = req.body;
    const decryptedPassword = decryptPassword(pass, iv);

    const hash = bcrypt.hashSync(decryptedPassword, 10);
      const acttoken=uuidv4(); 
     const newRecord =new Registermodel({name:req.body.pname,phone:req.body.phone,emailid:req.body.email,password:hash,
      usertype:"normal",isActivated:false,token:acttoken});
//     newRecord.save().then(()=>res.send({msg:"signup Done"}))
// .catch(()=>res.send({msg:"error in signing"}));
   const result= await newRecord.save();
   if(result)
   {
     const mailOptions = 
     {
       from: 'class@gtbinstitute.com',
       to: req.body.email,
       subject: 'Account Activation Mail from ShoppingPoint.com',
       html: `Dear ${req.body.pname}<br/><br/>Thanks for signing up on our website. You can activate your account by clicking on the following link:-<br/><br/> <a href='http://localhost:3000/activate?token=${acttoken}'>Acivate Account</a><br/><br/>Team ShoppingPoint.com`
     };
     const emailResult = await sendMail(mailOptions);
     if (emailResult.success) 
     {
       res.send({ code: 1 });
     } 
     else 
     {
       res.send({ code: 2, error: emailResult.error });
     }
   } 
   else 
   {
     res.json({ code: 0 });
   }
 } 
 catch (e) 
 {
   res.send({ code: -1, errmsg: e.message });
   console.log(e.message);
 }
};

exports.Createadmin=async(req,res)=>
{
  try
  {
        const newRecord =new Registermodel({name:req.body.pname,phone:req.body.phone,emailid:req.body.email,password:req.body.pass,usertype:"admin"});
    //     newRecord.save().then(()=>res.send({msg:"signup Done"}))
    // .catch(()=>res.send({msg:"error in signing"}));
      const result= await newRecord.save();
          if(result)
          {
            res.send({code:1})
          }
          else
          {
            res.json({code:0})
          }
   }
        catch(e)
        {
            res.status(500).send(e.message)
            console.log(e.message);
        }
        }

exports.Alllogin=async(req,res)=>
        {
      try
      {
      const result= await Registermodel.findOne({emailid:req.body.uname})
      if(result)
    {
      if(bcrypt.compareSync(req.body.pass, result.password))
      {
        const respdata = {id:result._id,name:result.name,emailid:result.emailid,usertype:result.usertype,isActivated:result.isActivated}
        let jtoken = jwt.sign({id: result._id,role:result.usertype}, process.env.TSECRETKEY , { expiresIn: '1h' });
        res.send({code:1,membdata:respdata,jstoken:jtoken})
      }
      else
      {
        res.send({code:0})
      }
    }
        else
        {
            res.send({code:0})  
        }
    }
    catch(e)
    {
          res.send({code:-1,err:e.message})
    }
  }

  exports.Searchuser=async(req,res)=>
 {
     try
    {
      const result= await Registermodel.findOne({emailid:req.query.un})
      if(result)
      {
        res.send({code:1,membdata:result})
      }
      else
      {
        res.send({code:0})
      }
    }
    catch(e)
    {
        res.send({code:-1,errmsg:e.message})
    }
}

exports.Allusers=async(req,res)=>
   {
    try
    {
       const result=await Registermodel.find()
       if(result.length>0)
       {
        res.send({code:1,membsdata:result})
       }
       else
       {
        res.send({code:0})
       }
    }
    catch(e)
    {
       res.send({code:-1,errmsg:e.message})
    }
   }


 exports.Deleteusers= async(req,res)=>
{
    try
    {
        const result=await Registermodel.deleteOne({_id:req.query.uid})
        if(result.deletedCount===1)
        {
            res.send({code:1})
        }
        else
        {
            res.send({code:0})
        }
    }
    catch(e)
    {
        res.send({code:-1,errmsg:e.message})
    }
}

exports.Changepass=async(req,res)=>
  {
      try
      {
          const result= await Registermodel.findOne({emailid:req.body.uname})
          if(result)
          {
            if(bcrypt.compareSync(req.body.currpass,result.password))
            {
              const hash=bcrypt.hashSync(req.body.newpass,10);
              const result2=await Registermodel.updateOne({emailid:req.body.uname},{password:hash})
              if(result2.modifiedCount===1)
              {
                res.send({code:1})
              }
            }
            else
            {
                res.send({code:2})  
            }
          }
          else
          {
              res.send({code:0})  
          }
      }
      catch(e)
      {
           res.send({code:-1,err:e.message})
      }
  }

  exports.AccActivating= async(req,res)=>
  {
      try
      {
          const result=await Registermodel.updateOne({"token":req.query.token},{isActivated:true})
          if(result)
          {
              res.send({code:1})
          }
          else
          {
              res.send({code:0})
          }
      }
      catch(e)
      {
          res.send({code:-1,errmsg:e.message})
      }
  }

  exports.CookieStoring=async(req,res)=>
 {
     try
    {
      const result= await Registermodel.findOne({_id:req.query.id})
      if(result)
      {
        const respdata = {id:result._id,name:result.name,usertype:result.usertype,emailid:result.emailid}
        let jtoken = jwt.sign({id:result._id,role:result.usertype}, process.env.TSECRETKEY , { expiresIn: '1h' });
        res.send({code:1,membdata:respdata,jstoken:jtoken})
      }
      else
      {
        res.send({code:0})
      }
    }
    catch(e)
    {
        res.send({code:-1,errmsg:e.message})
    }
}
