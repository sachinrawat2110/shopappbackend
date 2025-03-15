const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupcontroller');
var jwt = require('jsonwebtoken');

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

router.post("/signup",signupController.Allsignup)
router.post("/createadmin",verifytoken,verifyAdmin,signupController.Createadmin)
router.post("/login",signupController.Alllogin)
router.get("/search",verifytoken,verifyAdmin,signupController.Searchuser)
router.get("/alluser",verifyAdmin,signupController.Allusers)
router.delete("/deluser",signupController.Deleteusers)
router.put("/changepass",verifytoken,signupController.Changepass)
router.get("/activateacc",signupController.AccActivating)
router.get("/fetchudetailsbyid",signupController.CookieStoring)

module.exports = router;
