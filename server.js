/**
 * Created by Val on 12/06/2017.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    //console.log(`${now}: ${req.method} ${req.originalUrl}`);
    var details = {
        Time: now,
        method: req.method,
        URL: req.originalUrl
    };
var det = JSON.stringify(details);
    fs.appendFile('log.log', det + '\n', (err)=>{
        if(err){
            console.log('unable to perform task');
        }
    });
    next();
});
//app.use((req, res, next)=>{
//    res.render('maintainance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});


app.get('/',(req, res)=>{
    //res.send(" <h1>hello world</h1>");
    res.render ('home.hbs' ,{
        title:'Home Page',
        welcomeMessage:' Welcome to our website'
    })

});
app.get('/about',(req, res)=>{
    res.render('about.hbs',
    {
        title : 'About Page ',

    });
});
app.get('/Bad',(req, res)=>{
    res.send({
        Errormessage: 'bad request',
        errorType: 'Bad URL'
    });
});


app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});