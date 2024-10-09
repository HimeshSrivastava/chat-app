import User from "../models/user.model.js";

export const getAllUsersForSidebar = async (req, res) => {
    try {           
            const userId = req.user._id; // or req.user._id if using auth middleware
            const users = await User.findById(userId);
        if (users.length === 0) {
            return res.status(400).json({ error: "No users found" });
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error in getAllUsersForSidebar:", error); // Log the actual error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
};

