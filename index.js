const express=require('express');

// create server
// server return an object
const server=express();

server.all('/api',(req,res)=>{
   // served with any request (GET,POST,DELETE,PUT)
    res.send(' Hello from api rout')
})

server.get('/api/Search',(rq,rs)=>{
    // return query variables
    const query=rq.query;
    console.log(query)
    rs.send(`product name ${query?.name} `)
})

// static files 
server.use(express.static('./app'))
// Routting
// Port where the server is running
server.listen(3000,(err)=>{console.log(err)})