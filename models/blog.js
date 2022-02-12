const mongoose=require('mongoose')
const BlogSchema=new mongoose.Schema({

    title:{
        type:String,
        unique:true,
        trim:true,
        required:[true,'blog title is mandatory'],
        maxlength:[30,'maximum 30 characters'],
        minlength:[2,'minimum 2 characters'],
    },
    desc:{
        type:String,
        required:[true,'blog description is mandatory'],
    },
    blogImg:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports=mongoose.model('blogSchema',BlogSchema)