const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required: true,
        min:0

    },
    quantity:{
        type:Number,
        required:true,
        min:[1,"Quantity must be at least 1"]
    }

});

const orderSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
    customerName:{
        type:String,
        required:[true,"Customer name is required"],
        trim:true,
        minlength:[3,"Customer name must be at least 3 characters long"]

    },
    email:{
        type:String,
        required:[true,"Customer email is required"],
        trim:true,
        match:[/^\S+@\S+\.\S+$/,"Please provide a valid email address"]
    },
    phone:{
        type:String,
        required:[true,"Customer phone number is required"],
        trim:true,
    },
    address:{
        type:String,
        required:[true,"Customer address is required"],
    },
    items:{
        type:[orderItemSchema],
        required:[true,"Order items are required"],
    },
    totalAmount:{
        type:Number,
        required:[true,"Total amount is required"],
        min:[0,"Total amount must be a positive number"]
    },
    paymentMethod:{
        type:String,
        required:[true,"Payment method is required"],
        enum:["Cash on Delivery","Credit Card","Debit Card","PayPal"]
    },
    orderStatus:{
        type:String,
        required:[true,"Order status is required"],
        default:"Pending",
        enum:["Pending","Processing","Shipped","Delivered","Cancelled"]
    }
},
    { timestamps:true}
);

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;