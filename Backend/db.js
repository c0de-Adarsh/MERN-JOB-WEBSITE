const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

db.on('connected',()=>{
    console.log('MongoDB connected successfully')
})

db.on('error',(err)=>{
    console.log('MongoDB connection error',err)
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected')
})

module.exports = db