// adding dipendancy
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { create } = require('./models/blog');

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

const express = 



app.get('/blogs/create', (req,res)=>{
    res.render('create', { title : 'Creat New Blog'});
});

app.post('/blogs',(req,res)=>{
       
    /*console.log(req.body); 

         give body that we entered at form  ---> {
            title: 'form body',
           snippet: 'this is form body.',
           body: 'this is form body given by the req.body '
         }*/

        const blog = new Blog(req.body);
        blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        });
       
});

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('details',{title:result.title, blog:result});
    })
    .catch(err=>{
        // console.log(err);
        res.render('404',{ title:'Blog not foung'});
    });
});

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'});
    })
    .catch(err=>{
        console.log(err);
    });
});

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index',{title: 'All blogs', blogs: result});
        })
        .catch((err)=>{
            console.log(err);
        });
});
// 404
app.use((req,res)=>{
    res.status(404).render('404',{ title : '404'});
});