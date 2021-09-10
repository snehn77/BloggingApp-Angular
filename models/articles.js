var mongoose = require('mongoose');
var marked = require('marked');
var createDomPurifier = require('dompurify');
var {JSDOM} = require('jsdom');

var dompurify = createDomPurifier(new JSDOM().window);

const articleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    categories:{
        type : String,
        required:true
    },
    content : {
        type : String,
        required: true
    },
    sanitizedHTML:{
        type:String,
        required:true
    }
})

// Every time update delete or any opertion is called this function is also called
articleSchema.pre('validate', function(next){
    if(this.content){
        // prifies the HTML to get rid of any malicious code
        this.sanitizedHTML = dompurify.sanitize(marked(this.content));
    }
    next()
});

module.exports = mongoose.model('Blog', articleSchema);