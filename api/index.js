const express = require('express')
const app = express()
const mongoose =require('mongoose')
const port= 3000
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log("Connected!")}).catch((err)=>{console.log(err);});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})