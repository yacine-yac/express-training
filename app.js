const express=require('express');
const session=require('express-session'); 
 

const server=express();
 
server.set('view engine', 'ejs');  
server.set('views',"./templates");
const sessionOptions={
   name:"otako",
   secret:"esgen",
   // Forces the session to be saved
   // back to the session store
   resave:true,
   saveUninitialized:false,
   cookie:{maxAge: 50000000 },
 
};
server.use(session(sessionOptions))
const authorization=(req,res,next)=>{
   
   if(!req.session.user){ 
      
      const urlPath= req.baseUrl ? `/login?redirect=${req.baseUrl}` : '/login';
    
         res.redirect(urlPath)
         return;
   } 
    next(); 
}
const arr=['login','auth','out'].join('|');
const regx=new RegExp(`^(?!\/(${arr})$).*$`,"g");
server.use(regx,authorization);
const redirect= (req,res,next)=>{  
   const direction=req.query?.redirect ;
   console.log('>>>>',req.query)
 
   res.redirect(direction ?? "/")
   res.end();
}
server.use('/login',(req,res)=>{ 
   // access session data
   const authUrl= req.query.redirect ? `auth?redirect=${req.query.redirect}` :'/auth';
     !req.session.user ?
            res.render("login",{authUrl:"/auth",redirect:req.query.redirect ?? "/"})
            : res.redirect('/')
})
server.get('/about',(req,res)=>{
   res.send('hello about <a href="/">Home</a>');
})
server.get('/',(req,res)=>{
            // render profil.ejs view
            // console.log(req.session )
            // req.session.destroy((err)=>console.log(err))
            // console.log(req.sessionStore.all((err,sessio)=>console.log(err,sessio)))
            // console.log(req.session.user?.count)
            req.session.user && req.session.user.count++
            // req.session.user
            // ? 
             res.render("profil",{name:"yacine",age:24})
            // :  res.redirect('/login')

})


server.route('/auth').all((req,res,next)=>{ 
   const {email,password}=req.query;
   // if(!email){ res.json({errorMessage:"email not "}); res.end()}
   // if(!password){ res.json({errorMessage:"password not "}); res.end()}
   if(!email){res.status(404).json({error:'please check email'})   ;return }
   if(!password){ res.status(404).json({error:'please check password'}); return  }
   const user={
      id:777,
      name:"yacine",
      password:'ed8',
      count:0
   }
   req.session.user=user
    next()
},redirect)




// log out 
server.get('/out',(req,res)=>{
   req.session.destroy(()=>{
       // callback
      console.log('destroied session')
   });
   res.redirect('/login')
})
// Port where the server is running
server.listen(3000,(err)=>{console.log(err)})