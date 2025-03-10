const resetpassModel= require('../models/ResetPassModel');
const Registermodel= require('../models/signupmodel');
const { v4: uuidv4 } = require('uuid');
const { sendMail } = require('../utils/mailer')
const bcrypt = require('bcrypt');

exports.Forgotpass= async (req, res) => 
{
  try
  {
    const userdata = await Registermodel.findOne({ emailid: req.params.uname });
    if (!userdata) 
    {
      return res.send({code:0});
    }
    else
    {
      var resettoken = uuidv4();
      var minutesToAdd=15;
      var currentDate = new Date();//current date and time
      var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);//current millsecs+15 mins millsecs
  
      var newreset = new resetpassModel({emailid:req.params.uname,token:resettoken,exptime:futureDate});
      let saveresult = await newreset.save();
  
      if(saveresult)
      {
        const mailOptions = 
        {
          from: 'class@gtbinstitute.com',
          to: req.params.uname,
          subject: 'Reset your password::ShoppingPoint.com',
          html: `Hi ${userdata.name},<br/><br/> Please click on the following link to reset your password: <br/><br/>
          <a href='http://localhost:3000/resetpassword?token=${resettoken}'>Reset Password</a>`
        };
        // Use the transport object to send the email
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
  }
  catch(e)
  {
    res.send({code:-1,errmsg:e.message})
  }
};

exports.CheckToken=async(req,res)=>
{
  try
  {
    const result = await resetpassModel.findOne({token:req.query.token})
    if(result)
    {
      const currtime = new Date();
      const exptime = new Date(result.exptime);
      if(currtime<exptime)
      {
        res.send({code:1,passdata:result})
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
    res.send({code:-1,errmsg:e.message})
  }
}

exports.ResetPass=async(req,res)=>
{
  try
  {
    const hash = bcrypt.hashSync(req.body.newpass, 10);
    const result = await Registermodel.updateOne({emailid:req.body.uname},{password:hash})
    if(result.modifiedCount===1)
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

exports.Contactus=async(req,res)=>
  {
    try
    {
      const mailOptions = 
      {
        from: 'class@gtbinstitute.com',//transporter username email
        to: 'gtbtrial@gmail.com',//any email id of admin or where you want to receive email
        replyTo: req.body.email,
        subject: 'Message from Website - Contact Us',
        html: `<b>Name:-</b> ${req.body.name}<br/><b>Phone:-</b> ${req.body.phone}<br/><b>Email:-</b> ${req.body.email}
        <br/><b>Message:-</b> ${req.body.msg}`
      };
  
      // Use the transport object to send the email
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
catch(e)
{
  res.send({code:-1,errmsg:e.message})
}
};