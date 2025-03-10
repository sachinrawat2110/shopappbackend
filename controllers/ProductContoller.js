const ProdModel = require('../models/ProductModel');

exports.SaveProduct=async(req,res)=>
  {
    try
    {
      var picname="nopic.jpg";
      if(req.file)
      {
          picname=req.file.filename;
      }
  
      const newRecord = new ProdModel({catid:req.body.cid,subcatid:req.body.scid,prodname:req.body.pname,description:req.body.description,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,featured:req.body.feat,picture:picname,addedon:new Date()});

      const result = await newRecord.save();
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
      res.send({code:-1,errmsg:e.message})
      console.log(e);
    }
  }

  exports.Productsbysubcatid=async(req,res)=>
  {
    try
    {
      const result = await ProdModel.find({subcatid:req.params.scid}).populate(`subcatid`,`subcatname`)
      if(result.length>0)
      {
        res.send({code:1,productsdata:result})
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

  exports.ProductDetails=async(req,res)=>
  {
    try
    {
      const result = await ProdModel.findOne({_id:req.params.pid}).populate(`subcatid catid`,`subcatname catname`)
      if(result)
      {
        res.send({code:1,proddata:result})
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


  exports.UpdateProduct=async(req,res)=>
  {
    try
    {
      var picname;
      if(req.file) // it shows that there is a file in the request and admin wants to change the image
      {
          picname=req.file.filename;
          if(req.body.oldpicname!=="nopic.jpg")
          {
            fs.unlinkSync(`${uploadpath}/${req.body.oldpicname}`);
          }
      }
      else
      {
        picname=req.body.oldpicname;
      }
      const result = await ProdModel.updateOne({_id:req.body.pid},{catid:req.body.cid,subcatid:req.body.scid,prodname:req.body.pname,description:req.body.description,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,featured:req.body.feat,picture:picname})
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

  exports.DeleteProduct=async(req,res)=>
  {
    try
    {
      const result = await ProdModel.deleteOne({_id:req.params.pid})
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

  exports.SearchProducts=async (req, res) => 
  {
    try 
    {
      var searchtext=req.params.text;
      const result = await ProdModel.find({prodname:{ $regex: '.*' + searchtext ,$options:'i' }})
      if(result.length>0) 
      {
        res.send({ code: 1, productsdata: result });
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

  exports.FeatProducts=async(req,res)=>
  {
    try
    {
      const result = await ProdModel.find({featured:'yes'})
      if(result.length>0)
      {
        res.send({code:1,productsdata:result})
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