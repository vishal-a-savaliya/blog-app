// adding express
const  express = require('express');
const morgan = require('morgan'); // middelware
//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');
// if we didn't save your file in folder name view then we need to write
// app.set('views','your folder name');


//listen for requests
app.listen(3000);

//middelware
// app.use((req,res, next)=>{
//     console.log('New request is made:');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('method: ',req.method);
//     next();// for moving controle to next block,
// });

app.use(morgan('dev'));

// static files

app.use(express.static('public'));// public is folder name that we want to amke public.

app.get('/', (req,res)=>{
    const blogs =[
        {title:'MERN',snippet:'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'},
        {title:'Learning',snippet:'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'},
        {title:'cool',snippet:'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'},
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