import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedroute = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', ''); //here we fetch token from header not from cookies
     // console.log("token",token)

    if (!token) {
      return res.status(401).json("Token not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // console.log(decoded.userid);

    const user = await User.findById(decoded.userid).select("-password"); 
    if (!user) {
      return res.status(404).json("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export default protectedroute;