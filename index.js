const express=require('express');

// create server
// server return an object
const server=express();



// static files 
server.use(express.static('./app'))
// Routting
// Port where the server is running
server.listen(3000,(err)=>{console.log(err)})