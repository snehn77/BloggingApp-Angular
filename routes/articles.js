var express = require('express');
var Blog = require('../models/articles');
var router = express.Router()

// To retrieve all blogs
router.get('/', (req,res) => {
    Blog.find((err,docs)=>{
        if(!err){
            res.json(docs);
        }
        else{
            console.log('Error in Retriving Employees: ' + JSON.stringify(err,undefined,2));
        }
    });
});

//Get a paticular id
router.get('/:id' ,(req,res)=>{
    try{
        Blog.findById(req.params.id , (err,doc)=>{
           if(!err){
              res.send(doc);
            }
            else{
               console.log('Error in Retriving Employees: ' + JSON.stringify(err,undefined,2));
            }
        });
    }
    catch(e){
        console.log(e)
    }    
});

// next says go on to the next function in the list
router.post('/', (req,res,next)=>{
    var blog = new Blog({
        title:req.body.title,
        categories:req.body.categories,
        content:req.body.content
    });
    blog.save((err , doc)=>{
        if(err){
            res.json({msg : 'Error while Adding Blog!'});
            console.log(err);
        }
        else{
            res.json({msg : 'Blog Posted Successfully'});
        }
    });
});

// Edit a blog
router.put('/:id', (req,res,next)=>{
    Blog.findById(req.params.id , (err , blog)=>{
        if(err){
            res.json({msg : 'Error while Adding Blog!'});
            console.log(err);
        }
        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.categories = req.body.categories;
        blog.save((err , doc)=>{
            if(err){
                res.json({msg : 'Error while Adding Blog!'});
                console.log(err);
            }
            else{
                res.json({msg : 'Blog Posted Successfully'});
            }
        });
    })
   
 });

 // Delete a Blog
router.delete('/:id', (req,res) =>{
    var blog = {
        title:req.body.title,
        categories:req.body.categories,
        content:req.body.content
    };    
    // $set tell mongodb to update blog with the id with info in the blog
    // If new:true then doc would have the updated parameter details or else it would have the old
     Blog.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Retriving Employees: ' + JSON.stringify(err,undefined,2));
        }
    });
});


module.exports = router;