const CartModel= require('../models/CartModel');

exports.AddToCart= async(req,res)=>
{
  try
  {
    const result1 = await CartModel.findOne({prodid:req.body.prodid,emailid:req.body.uname});
    if(result1)
    {
      const newqty = Number(result1.qty)+Number(req.body.qty);//oldqty+newqty
      const newtotalcost = Number(req.body.rate)*Number(newqty);
      const updateresult = await CartModel.updateOne({prodid:req.body.prodid,emailid:req.body.uname},{qty:newqty,totalcost:newtotalcost})
      if(updateresult.modifiedCount===1)
      {
        res.send({code:1})
      }
      else
      {
        res.send({code:0})
      }
    }
    else
    {
      const newRecord = new CartModel({prodid:req.body.prodid,picture:req.body.pic,prodname:req.body.pname,rate:req.body.rate,qty:req.body.qty,totalcost:req.body.tc,emailid:req.body.uname});

      const result2 = await newRecord.save();
      if(result2)
      {
        res.send({code:1})
      }
      else
      {
        res.json({code:0})
      }
    }
   
  }
  catch(e)
  {
    res.send({code:-1,errmsg:e.message})
  }
}

exports.GetUserCart=  async (req, res) => 
{
  try 
  {
    const result = await CartModel.find({ emailid:req.params.uname })
    if (result.length > 0) 
    {
      res.send({ code: 1, usercart: result });
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

exports.DeleteCart= async(req,res)=>
  {
    try
    {
      const result = await CartModel.deleteOne({_id:req.query.id})
      console.log(result)
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