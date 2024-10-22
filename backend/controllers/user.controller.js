import User from "../models/user.model.js";

export const getAllUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; 

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    if (!users) {
      return res.status(400).json({ error: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log('Error in fetching users:', error);
    res.status(500).json("Internal server error");
  }
};
