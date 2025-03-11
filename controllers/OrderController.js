const OrderModel= require('../models/OrderModel');
const ProdModel = require('../models/ProductModel');
const CartModel= require('../models/CartModel');
const { sendMail } = require('../utils/mailer')

exports.SaveOrder=async(req,res)=>
    {
      try
      {
        var orditems = req.body.orderitems;
        for(var x=0;x<orditems.length;x++)
        {
          const updateresult = await ProdModel.updateOne({_id:orditems[x].prodid},{$inc:{"Stock":-orditems[x].qty}})
        }
  
        const newRecord = new OrderModel({emailid:req.body.uname,address:req.body.addr,pmode:req.body.pmode,cardetails:req.body.carddetails,orderdt:new Date(),billamt:req.body.tbill,items:req.body.orderitems,status:"Order Received, Processing"});
  
        const result = await newRecord.save();
        if(result)
        {
          const delresult = await CartModel.deleteMany({emailid:req.body.uname})
          res.send({code:1})
        }
        else
        {
          res.json({code:0})
        }
      }
      catch(e)
      {
        res.send({code:-1,errmsg:e.message})
        console.log(e);
      }
    }

exports.FetchOrderDetails=async (req, res) => 
  {
    try 
    {

      const result = await OrderModel.findOne({emailid:req.query.un}).sort({"orderdt":-1})
      if(result) 
      {
        {
          const mailOptions = 
          {
            from: 'class@gtbinstitute.com',
            to: req.query.un,
            subject: 'Thanks for Shopping From Our Website',
            html: `Hi ${result.emailid} Thanks For Shopping from our Website. After the delivery of product please give us feedback`
          };
          // Use the transport object to send the email
          const emailResult = await sendMail(mailOptions);
          if (emailResult.success) 
          {
            res.send({ code: 1, orderdet: result });
          } 
          else 
          {
            res.send({ code: 2, error: emailResult.error });
          }
        } 
      } 
    } 
    catch (e) 
    {
      res.send({ code: -1, errmsg: e.message });
    }
  }

  exports.GetOrders=async (req, res) => { {Complexity}
    try {
      const inputDate = req.query.odt; // E.g., "2025-01-20"
  
      // Convert the input date to the start and end of the day
      const startOfDay = new Date(`${inputDate}T00:00:00.000Z`);
      const endOfDay = new Date(`${inputDate}T23:59:59.999Z`);
  
      // Query for records within the date range
      const result = await OrderModel.find({
        orderdt: { $gte: startOfDay, $lte: endOfDay }
      }).sort({ orderdt: -1 });
  
      if (result.length > 0) {
        res.send({ code: 1, orddata: result });
      } else {
        res.send({ code: 0 });
      }
    } catch (e) {
      res.send({ code: -1, errmsg: e.message });
    }
  }

  exports.GetUserOrders=async (req, res) => 
  {
    try 
    {
      const result = await OrderModel.find({emailid:req.query.un}).sort({"orderdt":-1})
      if (result.length > 0) 
      {
        res.send({ code: 1, orddata: result });
      } 
      else 
      {
        res.send({ code: 0});
      }
    } 
    catch (e) 
    {
      res.send({ code: -1, errmsg: e.message });
    }
  }

  exports.GetOrderItems= async (req, res) => 
  {
    try 
    {
      const result = await OrderModel.findOne({"_id":req.query.oid})
      if (result) 
      {
        res.send({ code: 1, itemsdata: result.items});
      } 
      else 
      {
        res.send({ code: 0});
      }
    } 
    catch (e) 
    {
      res.send({ code: -1, errmsg: e.message });
    }
  }

  exports.UpdateStatus=async(req,res)=>
  {
    try
    {
      const result = await OrderModel.updateOne({_id:req.body.ordid},{status:req.body.newstatus})
      console.log(result)
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
