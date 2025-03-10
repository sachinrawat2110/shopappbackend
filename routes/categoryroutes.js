const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const Categorycontroller = require('../controllers/categorycontroller');
const upload = require('./multer')

  function verifytoken(req,res,next)
  {
    if(!req.headers.authorization)
    {
      return res.status(401).send('Unauthorized Subject')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token=='null')
    {
      return res.status(401).send('Unauthorized request')
    }
    try 
    {
      const payload = jwt.verify(token, process.env.TSECRETKEY);
      console.log(payload)
      if(!payload)
      {
        return res.status(401).send('Unauthorized Request')
      }
      req.user = payload;//id,role
      next();
    } 
    catch (err) 
    {
      res.status(400).json({ message: "Invalid Token" });
    }
  }
  
  const verifyAdmin = (req, res, next) => 
  {
    if (req.user.role !== "admin") 
    {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }
    else
    {
      next();
    }
  };

router.post("/category",upload.single('cpic'),verifytoken,verifyAdmin,Categorycontroller.Addcategory)
router.get("/getallcat",verifytoken,Categorycontroller.GetAllCategory)
router.delete("/delcat",Categorycontroller.DeleteCategory)
router.put("/updatecat",upload.single(`cpic`),Categorycontroller.UpdateCategory)

module.exports = router;
