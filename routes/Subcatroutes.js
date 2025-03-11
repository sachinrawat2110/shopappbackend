const express = require('express');
const router = express.Router();
const SubCatcontroller = require('../controllers/SubCatcontroller');
const upload = require('./multer');

router.post("/savesubcategory",upload.single('scpic'),SubCatcontroller.AddSubcategory)
router.get("/getsubcatbycatid/:cid",SubCatcontroller.GetSubcategory)
router.put("/updatesubcat",upload.single('scpic'),SubCatcontroller.UpdateSubcat)
router.delete("/delsubcat/:scid",SubCatcontroller.DeleteSubcat)

module.exports = router;
