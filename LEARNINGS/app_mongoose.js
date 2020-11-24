// adding express
const  express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
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
app.use(morgan('dev'));


// working with mongoose
app.get('/add-blog',(req,res)=>{

    const blog = new Blog({
        title:'new blog 2',
        snippet:'about my new blog',
        body: 'this is awsome'
    });

    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/all-blogs',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.get('/single-blog',(req,res)=>{
    Blog.findById('5f89ac1fc5fa14c98c0c7540')
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});



// router

app.get('/', (req,res)=>{
    const blogs =[
        {title:'MERN',snippet:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus maiores error excepturi laboriosam iure eligendi adipisci temporibus accusamus enim ratione.'},
        {title:'Learning',snippet:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus maiores error excepturi laboriosam iure eligendi adipisci temporibus accusamus enim ratione.'},
        {title:'cool',snippet:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus maiores error excepturi laboriosam iure eligendi adipisci temporibus accusamus enim ratione.'},
    ];
    res.render('index',{ title : 'Home',blogs });// blogs:blogs = blogs
});

app.get('/about',(req,res)=>{
    res.render('about',{ title: 'About'});
});

app.get('/blogs/create', (req,res)=>{
    res.render('create', { title : 'Creat New Blog'});
});


// 404

app.use((req,res)=>{
    res.status(404).render('404',{ title : '404'});
});