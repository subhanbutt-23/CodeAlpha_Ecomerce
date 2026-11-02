const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/auth",authRoutes);
//test route
app.get("/",(req,res)=>{
    res.send("API is running...");
})
app.get("/store",(req,res)=>{
    res.send("Welcome to CodeAlpha Ecommerce API");
});


//Start server

const PORT = process.env.PORT || 5000;
const startServer = async () =>{
    await connectDB();
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

});

startServer();