//import mongoose
const mongoose = require('mongoose')

//get connection string from .env file
const connectionString = process.env.DATABASE;

//connect mongoDB
mongoose.connect(connectionString).then((res)=>{
    console.log("mongoDB connected successfully!!!");
}).catch((err)=>{
    console.log(`mongoDB connect failed due to ${err}`)
})
