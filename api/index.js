// const express = require('express')
import express from 'express';
const app = express()
app.use(express.json())
import mongoose from 'mongoose';
// const mongoose =require('mongoose')
const port= 3400
import dotenv from 'dotenv'
// const dotenv = require('dotenv');
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log("Connected!")}).catch((err)=>{console.log(err);});
app.get('/', (req, res) => {
  res.json({message:'Hello World!'})
})
app.use('/api/user',userRoutes)

app.use('/api/auth',authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use((err,req,res,next)=>{
  const statusCode= err.statusCode || 500;
  const message= err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    error:message,
    statusCode
  });

})