const mongoose=require('mongoose')
//connect to db

const connectDB= async ()=>{
    try{
        await mongoose.connect("mongodb+srv://khushikug20cse:zmoo3TtXJebCiG4f@mern-blog-v1.zfwqlcf.mongodb.net/mern-blog?retryWrites=true&w=majority")
        console.log('DB has been connected');
    }catch(error){
        console.log('DB connection failed',error.message);
    }
};

module.exports=connectDB;

