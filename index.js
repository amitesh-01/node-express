const express = require('express');
const { set } = require('express/lib/application');
const http = require('http');
const morgan = require('morgan');
const bodyParser=require('body-parser');

const hostname='localhost';
const port=3000;
 
const app=express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.all('/dishes',(req,res,next) =>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
});

app.get('/dishes',(req,res,next) =>{
    res.end('will send you all the dishes');
});

app.post('/dishes',(req,res,next) =>{
    res.end('will add the dish'+ req.body.name + 'and the details'+req.body.description);
});

app.put('/dishes',(req,res,next) =>{
    res.statusCode=403;
    res.end('put operation is not supported on /dishes');
});

app.delete('/dishes',(req,res,next) =>{
    res.end('deleting all the dishes');
});

app.get('/dishes/:dishID',(req,res,next) =>{
    res.end('will send you details of the dish: '+ req.params.dishID+'to you');
});

app.post('/dishes/:dishID',(req,res,next) =>{
    res.statusCode = 403;
    res.end('post operation is not supported on /dishes/'+req.params.dishID);
});

app.put('/dishes/:dishID',(req,res,next) =>{
    res.write('updating the dish '+req.params.dishID+'/n')
    res.end('will update the dish :'+req.body.name+' with details '+req.body.description);
});

app.delete('/dishes/:dishID',(req,res,next) =>{
    res.end('deleting the dish: '+req.params.dishID);
});


app.use(express.static(__dirname+'/public'));

app.use((req,res,next) =>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});
const server=http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});