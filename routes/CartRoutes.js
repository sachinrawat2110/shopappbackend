const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post("/addtocart",CartController.AddToCart)
router.get("/getusercart/:uname",CartController.GetUserCart)
router.delete("/delcartitem",CartController.DeleteCart)

module.exports = router;