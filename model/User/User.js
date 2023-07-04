const mongoose=require('mongoose');

//schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['user','admin'],
        default:'user',
    },
    password:{
        type:String,
        required:true,
    },
    lastLogin:{
        type:Date,
        default:Date.now(),
    },
    isVerified:{
        type:String,
        default:false,
    },
    accountLevel:{
        type:String,
        enum:["bronze","silver","gold"],
        dafault:"bronze",
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverImage:{
        type:String,
        default:"",
    },
    bio:{
        type:String,
    },
    location:{
        type:String,
    },
    notificationPreferences:{
        email:{type:String,default:true},
        //.. other notification preferences
    },
    gender:{
        type:String,
        enum:["male","female","prfer not to say","non-binary"],
    },
    profileViewers: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    blockedUsers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    likedPosts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    passwordResetToke:{
        type:String,
    },
    passwordResetExpires:{
        type:Date,
    },
    location:{
        type:String,
    },
    accountVerficationToken:{
        type:String,
    },
    accountVerificationExpires:{
        type:Date,

    },
},
{
    timestamps:true,
}

);

//compile schema to model

const User=mongoose.model("User",userSchema);

module.exports=User;