import User from "../models/user.model.js";

export const getallusersforsidebar=async(req,res)=>{
    try {
        const loggeduser =req.user._id;
        
          const filteruser=await User.find({_id:{$ne:loggeduser}}).select("-password");
          res.status(201).json(filteruser);
       

        } catch (error) {
            console.error("Error in Gettingmessages:", error);
            res.status(500).json("Internal server error");
        }

}