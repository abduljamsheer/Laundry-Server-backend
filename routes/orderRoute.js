const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY || '1234zeesh@encoded';
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


router.delete("/:orderId", Auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

   
    const result = await Order.findOneAndDelete({ orderId, userId });

    if (!result) {
      return res.status(404).json({
        status: "Failed",
        message: "Order not found or not authorized to delete",
      });
    }

    res.json({
      status: "Success",
      message: "Order deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// router.put("/:order_id", tokenAuth, async (req, res) => {
//   try {
//     const data = await Order.findOne({ orderId: req.params.order_id });

//     //* checking the user email is entered same or not.
//     if (data.email !== req.loggedIn_email) {
//       return res.status(401).json({
//         status: "Failed",
//         message: "Not Authorized",
//       });
//     }

//     const updateData = {};
//     if (req.body.orderId) {
//       updateData.orderId = req.body.orderId;
//     }
//     if (req.body.storeLocation) {
//       updateData.storeLocation = req.body.storeLocation;
//     }

//     if (req.body.city) {
//       updateData.city = req.body.city;
//     }
//     if (req.body.storePhone) {
//       updateData.storePhone = req.body.storePhone;
//     }
//     if (req.body.totalItems) {
//       updateData.totalItems = req.body.totalItems;
//     }
//     if (req.body.price) {
//       updateData.price = req.body.price;
//     }
//     if (req.body.status) {
//       updateData.status = req.body.status;
//     }
//     const orders = await Order.updateOne({ orderId: req.params.order_id }, updateData);
//     res.json({
//       status: "Success",
//       orders,
//     });
//   } catch (e) {
//     res.status(400).json({
//       status: "Failed",
//       message: e.message,
//     });
//   }
// });


// router.use("*", (req, res) => {
//   res.status(500).send("Invalid Url");
// });

module.exports = router;