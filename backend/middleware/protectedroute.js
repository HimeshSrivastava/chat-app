// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const protectedroute = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');


//     if (!token) {
//       return res.status(401).json("Token not found");
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // console.log(decoded.userid);

//     const user = await User.findById(decoded.userid).select("-password"); 
//     if (!user) {
//       return res.status(404).json("User not found");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(500).json("Internal server error");
//   }
// };

// export default protectedroute;
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedroute = async (req, res, next) => {
  try {
    console.log("Headers received:", req.headers); // Debugging: Print all headers

    // Extract Authorization header and remove "Bearer " prefix
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Extracted Token:", token); // Debugging: Check token

    if (!token) {
      return res.status(401).json({ success: false, message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded); // Debugging: Check decoded token

    const user = await User.findById(decoded.userid).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default protectedroute;
