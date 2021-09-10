var express = require('express');
var mongoose = require('mongoose');
var articleRouter = require('./routes/articles');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/blogs',articleRouter);
// Mongoose Connection
mongoose.connect('mongodb://localhost/SnehTechBlogDb', {
    useNewUrlParser:true , useUnifiedTopology: true, useCreateIndex:true
})

mongoose.connection.on('connected', ()=>{
    console.log('Database Connected Successfully!');
});

mongoose.connection.on('error', (err)=>{
    if(err){
        console.log('Error in Database Connection: ',err);
    }
});



app.listen(process.env.port || 3000 , ()=>{
    console.log('Server is running on Port: 3000')
});
