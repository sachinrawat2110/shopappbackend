const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post("/saveorder",OrderController.SaveOrder)
router.get("/fetchorderdetails",OrderController.FetchOrderDetails)
router.get("/getorders",OrderController.GetOrders)
router.get("/getuserorders",OrderController.GetUserOrders)
router.get("/getorderitems",OrderController.GetOrderItems)
router.put("/updatestatus",OrderController.UpdateStatus)

module.exports = router;