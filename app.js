// adding dipendancy
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routers/blogRouters')

// const { render } = require('ejs');
//express app
const app = express();

//conection to the mongodb
const dbURL="mongodb+srv://vishal:151020@cluster0.zpbrr.mongodb.net/mern?retryWrites=true&w=majority";

mongoose.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

//register view engine
app.set('view engine', 'ejs');
// if we didn't save your file in folder name view then we need to write
// app.set('views','your folder name');


//listen for requests
// app.listen(3000);


// static files

app.use(express.static('public'));// public is folder name that we want to amke public.


// middelwere
app.use(express.urlencoded({ extended: true })); // give body as response 
app.use(morgan('dev'));


// router
app.get('/', (req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{ title: 'About'});
});

// blog routers

app.use('/blogs',blogRouter);

// 404
app.use((req,res)=>{
    res.status(404).render('404',{ title : '404'});
});