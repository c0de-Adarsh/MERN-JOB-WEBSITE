const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
require('dotenv').config()
const cors = require('cors')

const app = express()
const route = require('./Routes/Route')


const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(route)

app.get('/',(req , res) =>{
    res.send('hello world')
})

app.listen(PORT,()=>{
    console.log(`The server is up and listeing on ${PORT}`)
})