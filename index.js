

//import router
const router = require('./Routes/router')

//1)import dotenv
require('dotenv').config()


//2)import express
const express =require("express")


//import connection.js
require('./DB/connection')


//3)import cors
const cors= require("cors")

//4)create server
const mpserver = express();

//5)make use of cors by server
mpserver.use(cors())

//6)use a middleware,to convert json to javascript object
mpserver.use(express.json());
//router use
mpserver.use(router)
//mpserver expose the path uploads
mpserver.use('/uploads',express.static('./uploads'))
 
//define port
const PORT = 5000;
//8)run the server
mpserver.listen(PORT,()=>{
    console.log(`server is running successfully at port:${PORT}`)
})

mpserver.get('/',(req,res)=>{
    res.send('music player server is running successfully1')
})

