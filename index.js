const express = require('express')
const app=express()
const cors = require('cors');
const connectdatabase= require('./Config/ConnectDb')
const products=require('./Router/productRoute')
const orders=require('./Router/orderRoute')
connectdatabase();
app.use(express.json())
app.use(cors());
app.use(products)
app.use(orders)
app.listen(3200,(req,res)=>{
    console.log("server is running port 3200")
})