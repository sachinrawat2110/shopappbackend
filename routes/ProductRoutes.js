const express = require('express');
const router = express.Router();
const ProductContoller = require('../controllers/ProductContoller');
const upload = require('./multer');

router.post("/saveproduct",upload.single('ppic'),ProductContoller.SaveProduct)
router.get("/getprodsbysubcat/:scid",ProductContoller.Productsbysubcatid)
router.get("/getproddetails/:pid",ProductContoller.ProductDetails)
router.put("/updateproduct",upload.single('ppic'),ProductContoller.UpdateProduct)
router.delete("/delprod",ProductContoller.DeleteProduct)
router.get("/searchprods/:text",ProductContoller.SearchProducts)
router.get("/getfeatprod",ProductContoller.FeatProducts)

module.exports = router;