const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Get all products
router.get("/",async (req,res)=>{
    try{
        const product = await Product.find();
        res.json(product);
    } catch (error){
        res.status(500).json({ message: "Server error" });
}});

router.get("/:id", async(req,res)=>{
    try{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
} catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
}
});
//add new product
router.post("/", async(req,res)=>{
    try{
    const newProduct = new Product( {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image:req.body.image
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: savedProduct });
} catch (error){
    if (error.name === "ValidationError") {
        return res.status(400).json({ message: "Invalid product data", error: error.message });
    }
    res.status(500).json({message:"Error adding product", error:error.message});
}
});

router.put("/:id", async (req, res) => {
    try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image:req.body.image
    }, { new: true , runValidators: true });
    if(!updatedProduct){
        return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", product: updatedProduct });
} catch (error){
    res.status(500).json({message:"Error updating product", error:error.message})
}
});

//delete product
router.delete("/:id",async(req,res)=>{
    try{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if(!deletedProduct){
        return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" , product: deletedProduct });
} catch (error){
    res.status(500).json({message:"Error deleting product", error:error.message})
}
});


module.exports = router;