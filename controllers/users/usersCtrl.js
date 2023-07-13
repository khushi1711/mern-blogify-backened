const bcrypt=require("bcryptjs");
const User=require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
//@desc register a new user
//@route POST /api /users/register
//@access public

exports.register = async (req, res) => {
  try {
    //get the details
    const { username, password, email } = req.body;
    //! Check if user exists
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User Already Exists");
    }
    //Register new user
    const newUser = new User({
      username,
      email,
      password,
    });
    //! hash password
    const salt=await bcrypt.genSalt(10)
    newUser.password=await bcrypt.hash(password,salt);
    //save
    await newUser.save();
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
    //   _id: newUser?._id,
    //   username: newUser?.username,
    //   email: newUser?.email,
    //   role: newUser?.role,
    newUser,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: error?.message,
    });
  }
};

//@desc login user
//@route POST /api/v1/users/login
//@access public

exports.login=async(req,res)=>{
    try{
        //? get the login details
        const {username,password}=req.body;
        //! check if exists
        const user=await User.findOne({username});
        if(!user){
            throw new Error("Invalid login credentials")
        }
        //compare the hashed password with one in the request
        const isMatched=await bcrypt.compare(password,user?.password)
        if(!isMatched){
            throw new Error("Invalid Login Credentials")
        }
        //update the last login
        user.lastLogin=new Date()
        res.json({
            status:"success",
            email:user?.email,
            _id:user?._id,
            username:user?.username,
            role:user?.role,
            token:generateToken(user),
        });
    }
    catch(error){
        res.json({
            status:"failed",
            message:error?.message
        })
    }
};

//@desc Get profile
//@route POST /api/v1/users/profile/:id
//@access private

exports.getProfile=async(req,res)=>{
  console.log(req.userAuth);
  try{
    //!get user id from params
    const id=req.userAuth._id;
    const user=await User.findById(id);
    console.log(user);
    res.json({
      status:'success',
      message:'Profile fethched',
      user,
    });
  }catch(error){
    res.json({
      status:'failed',
      message:error?.message,
    });
  }
};