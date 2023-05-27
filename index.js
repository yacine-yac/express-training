const express=require('express');

// create server
// server return an object
const server=express();

server.get('/api',(req,res,next)=>{
   // execute methods
    console.log('ttttt');
    // execute next to pass to the next handler 
    next();
},
(req,res)=>{
    res.status(200).send('second ....')

})

server.get('/api/Search',(rq,rs)=>{
    // return query variables
    const query=rq.query;
    console.log(query)
    rs.send(`product name ${query?.name} `)
})


// use route method
server.route("/book").get((req,res)=>{
        res.send('Release books')
}).post((req,res)=>{

    Sres.send('create new book')

})

server.get('/profil',(req,res)=>{
    //send file 
    res.sendFile('/dir/profil.html',{root:__dirname})
})

// static files 
server.use(express.static('./app'))
// Routting
// Port where the server is running
server.listen(3000,(err)=>{console.log(err)})