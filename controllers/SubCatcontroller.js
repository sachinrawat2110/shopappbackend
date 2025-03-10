const SubCatModel = require('../models/SubCatmodel');

exports.AddSubcategory=async(req,res)=>
{
  try
  {
    var picname=`nopic.jpg`
    if(req.file)
    {
     picname=req.file.filename 
    }

    const newRecord= new SubCatModel({catid:req.body.cid,subcatname:req.body.scname,subcatpic:picname,disporder:req.body.disporder});
    const result= await newRecord.save(); 
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
    console.log(e);
  }
}

exports.GetSubcategory=async(req,res)=>
{
  try
  {
    const result=await SubCatModel.find({catid:req.params.cid}).populate(`catid`,`catname`)
                                                     //Field from u get anything //what you want column name
    if(result.length>0)
    {
      res.send({code:1,subcatdata:result})
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

exports.UpdateSubcat=async(req,res)=>
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
        const result=await SubCatModel.updateOne({_id:req.body.scid},{catid:req.body.cid,subcatname:req.body.scname,
          subcatpic:picname,disporder:req.body.disporder})
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

  exports.DeleteSubcat=async(req,res)=>
  {
    try
    {
      const result = await SubCatModel.deleteOne({_id:req.params.scid})
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