const express=require('express');
const cookieParser=require('cookie-parser');
// create server
// server return an object
const server=express();
console.log(server)
const authorizationCookie=(req,res,next)=>{
    //authorization checking cookie
      const {authorization}=req.cookies;
      authorization ? next() : res.send('you are rejected by middleware') ;

}
// use middlewaree cookies parser
server.use(cookieParser());
server.use(authorizationCookie);


server.get('/api',(req,res,next)=>{
   // execute methods
    console.log('ttttt');
    // execute next to pass to the next handler 
    next();
},
(req,res)=>{
    res.cookie("mode","dark",{httpOnly:true,expires:new Date(Number(new Date()) + 360000)});
    res.status(200).json({"name":"yacine","age":24})

})

server.get('/api/Search',(rq,rs)=>{
    // return query variables
    const query=rq.query;
    console.log(query)
    rs.send(`product name ${query?.name} `)
})


// use route method
server.route("/download").get((req,res)=>{

       const {filename}=req.query;
       // download ressources to client 
       filename ?  res.download(filename)  :res.send('file not exists')

}).post((req,res)=>{

    res.send('create new book')

})
server.get('/:product',(req,res,next)=>{

       
     res.send('hello ' ) 
})
server.get('/profil',(req,res)=>{
    //send file 
    res.cookie('mode',"dark",{httpOnly:true,expires:new Date(Number(new Date())+6000)})
    res.sendFile('/dir/profil.html',{root:__dirname})
})

// static files 
server.use(express.static('./app'))
// Routting
// Port where the server is running
server.listen(3000,(err)=>{console.log(err)})