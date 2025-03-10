const express = require('express');
const router = express.Router();
const Resetpasscontoller = require('../controllers/ResetPasscontroller');

router.get("/forgotpass/:uname",Resetpasscontoller.Forgotpass)
router.get("/checktoken",Resetpasscontoller.CheckToken)
router.put("/resetpass",Resetpasscontoller.ResetPass)
router.post("/contactus",Resetpasscontoller.Contactus)

module.exports = router;