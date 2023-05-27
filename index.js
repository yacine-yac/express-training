const express=require('express');

// create server
// server return an object
const server=express();

// server endpoints

// GET method
server.get('/',(req,res)=>{res.send('Hello world')})


// Port where the server is running
server.listen(3000,(err)=>{console.log(err)})