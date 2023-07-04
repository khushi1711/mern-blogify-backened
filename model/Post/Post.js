const mongoose=require('mongoose');

//schema
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"",
    },
    claps:{
        type:Number,
        default:0,
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    shares:{
        type:Number,
        default:0,
    },
    postViews:{
        type:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category",
    },
    scheduledPublished:{
        type:Date,
        default:null,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    dislikes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            re:"User",
        },
    ],
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Comment",
        },
    ],
    
},
{
    timestamps:true,
}

);

//compile schema to model

const Post=mongoose.model("Post",postSchema);

module.exports=Post;