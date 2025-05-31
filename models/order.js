const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
    required: true
  },
    orderId: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    storePhone: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    price: { type: String, required: true },
    status: { type: String, default: "Ready to Pickup" },
    items:{type:Array, required: true},
    address:{type: String, required: true },
    cart: []
}, { timestamps: true })

module.exports = mongoose.model("orders", orderSchema);