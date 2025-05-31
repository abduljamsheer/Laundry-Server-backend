const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');
const Order = require("../models/order.js");
const Auth =require('./auth.js')
router.get("/",Auth , async (req, res) => {
  try {
    const userId =req.userId;
    const orders = await Order.find({ userId: req.userId });

    res.json({
      status: "Success",
      orders,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
      orders: []
    });
  }
});

router.post("/", Auth, async (req, res) => {
  try {
     req.body.userId = req.userId; 
    const orders = await Order.create(req.body);
    res.json({
      status: "Success",
      orders,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});


router.patch('/:id',Auth, async (req, res) => {
  try {
    
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
});

// router.use("*", (req, res) => {
//   res.status(500).send("Invalid Url");
// });

module.exports = router;