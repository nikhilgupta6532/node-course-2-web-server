const express=require('express');
const hbs = require('hbs');
const fs=require('fs');
var app = express();

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=now+''+req.method+''+req.url;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable to append to server.log');
    }
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
})

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'home page',
    welcomeMessage:'welcome to my website'
    //currentYear:new Date().getFullYear()
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  })
});

app.listen(3000,()=>{
  console.log('server is up on port 3000');
})
