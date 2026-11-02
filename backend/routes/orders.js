const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { customerName, email, phone, address, items } = req.body;
        if (!customerName || !email || !phone || !address) {
            return res.status(400).json({ message: "All customer details are required" 

            });
        }
        if(!Array.isArray(items) || items.length === 0){
            return res.status(400).json({ message: "Order items are required" });
        }
        let totalAmount = 0;
        const orderItems = [];
        for(const item of items){
            if(!item.productId || !item.quantity || item.quantity < 1){
                return res.status(400).json({ message: "Product ID and quantity are required for each item" 

                });
            }
            const product = await Product.findById(item.productId);
            if(!product){
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            const subtotal = product.price * item.quantity;
            totalAmount += subtotal;
            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            });
        }
const newOrder = new Order({
    user: req.userId,
    customerName,
    email,
    phone,
    address,
    items: orderItems,
    totalAmount,
    paymentMethod: "Cash on Delivery"
});
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: savedOrder });

    }
    catch (error){
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
});
// Get orders belonging to the logged-in user
router.get("/my-orders", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Fetch orders error:", error);

        res.status(500).json({
            message: "Failed to fetch your orders"
        });
    }
});

module.exports = router;