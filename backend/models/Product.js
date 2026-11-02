const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name is required"],
        trim:true,
        minlength:[3,"Product name must be at least 3 characters long"]

    },
    price:{
        type:Number,
        required:[true,"Product price is required"],
        min:[0,"Product price must be a positive number"]
    },
    category:{
        type:String,
        required:[true,"Product category is required"],
        trim:true,

    },
    image:{
        type:String,
        default:""
    }

});

const Prodcut = mongoose.model("Product",productSchema);
module.exports = Prodcut;