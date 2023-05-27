const express=require('express');

// create server
// server return an object
const server=express();

server.get('/api',(req,res,next)=>{
   // served with any request (GET,POST,DELETE,PUT) 
    console.log('ttttt'); 
    next();
},(req,res)=>{res.send('second ....')})

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