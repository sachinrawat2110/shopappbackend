const CatModel = require('../models/Categorymodel');

  exports.Addcategory=async(req,res)=>
{
  try
  {
    var picname=`nopic.jpg`;
    if(req.file)
    {
      picname=req.file.filename;
    }
    const newRecord = new CatModel({catname:req.body.cname,catpic:picname,disporder:req.body.disporder});
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
    console.log(e.message);
  }
}

exports.GetAllCategory=async(req,res)=>
  {
    try
    {
      const result = await CatModel.find()
      if(result.length>0)
      {
        res.send({code:1,catdata:result})
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

  exports.DeleteCategory=async(req,res)=>
    {
      try
      {
        const result = await CatModel.deleteOne({_id:req.query.cid})
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

    exports.UpdateCategory=async(req,res)=>
    {
      try
      { 
        var picname;
        if(req.file)
        {
          picname=req.file.filename;
          if(req.body.oldpicname!==`nopic.jpg`)
          {
            fs.unlinkSync(`${uploadpath}/${req.body.oldpicname}`);
          }
        }
          else
          {
            picname=req.body.oldpicname;
          }
        const result=await CatModel.updateOne({_id:req.body.cid},{catname:req.body.cname,catpic:picname,disporder:req.body.disporder})
         console.log(result);
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
        console.log(e.message);
      }
    }