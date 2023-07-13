const jwt = require("jsonwebtoken");
const User = require("../model/User/User");
const isLoggin =  (req, res, next) => {
  //Get token from header
  const token = req.headers.authorization?.split(" ")[1];

  //?verify the token
  jwt.verify(token, "anykey",async (err, decoded) => {

    //add user to req object
    const userId=decoded?.user?.id;
    const user=await User.findById(userId).select("username email role _id");

    //save user into req object
    req.userAuth=user;

    if (err) {
      return "Invalid token";
    } else {
      //!save the user
      //*send the user
      next();
    }
  });
};

module.exports = isLoggin;
