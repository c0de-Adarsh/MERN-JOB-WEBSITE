const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
require('dotenv').config()
const cors = require('cors')

const app = express()
const route = require('./Routes/Route')


const PORT = process.env.PORT || 5000

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true })); 

app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true // Cookies ke liye
}))

app.use(route)

app.get('/',(req , res) =>{
    res.send('hello world')
})

app.listen(PORT,()=>{
    console.log(`The server is up and listeing on ${PORT}`)
})