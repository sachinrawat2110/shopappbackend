const express = require('express');
const router = express.Router();
const SubCatcontroller = require('../controllers/SubCatcontroller');
const upload = require('./multer');

router.post("/savesubcategory",upload.single('cpic'),SubCatcontroller.AddSubcategory)
router.get("/getsubcatbycatid/:cid",SubCatcontroller.GetSubcategory)
router.put("/updatesubcat",upload.single('cpic'),SubCatcontroller.UpdateSubcat)
router.delete("/delsubcat/:scid",SubCatcontroller.DeleteSubcat)

module.exports = router;