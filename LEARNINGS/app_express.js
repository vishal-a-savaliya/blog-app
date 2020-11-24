// adding express
const  express = require('express');

//express app
const app = express();

//listen for requests
app.listen(3000);

app.get('/', (req,res)=>{
    //this is also set header and status code for us
    // res.send("<p>home page.</p>");

    //to send file
    res.sendFile('./view/index.html',{ root: __dirname });
});

app.get('/about',(req,res)=>{

    // res.send('<p>this is about page</p>');

    res.sendFile('./view/about.html', { root: __dirname });
});

//redirects

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

// 404

app.use((req,res)=>{
    // it must at bottom because it run if any requist is don't match with above. 
    // we need to set stats code
    res.status(404).sendFile('./view/404.html',{ root: __dirname });
});