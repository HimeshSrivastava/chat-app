import Message from "../models/message.model.js";
import Conservation from "../models/conservation.model.js";

export const sendmessages = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // Receiver's ID from URL params
        const senderId = req.user._id;  // Sender's ID from the logged-in user

        // Find the conservation between the sender and receiver
        let conservation = await Conservation.findOne({
            participants: {
                $all: [receiverId, senderId],
            }
        });

        // If no conversation exists, create a new one
        if (!conservation) {
            conservation = await Conservation.create({
                participants: [receiverId, senderId],
                messages: []  // Initialize an empty messages array
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Save the new message and push it to the conservation's messages array
        await newMessage.save();

        conservation.messages.push(newMessage._id);  // Push the new message's ID to the messages array
        await conservation.save();

        // Return the newly created message
        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error in sendmessages:", error);
        res.status(500).json("Internal server error");
    }
};

export const getallmessagesofconservation = async(req,res) =>{
    try {
        const {id:usersendId} =req.params;
        const senderId=req.user._id;
        const conservation = await Conservation.findOne({
           participants: {
               $all: [usersendId, senderId],
           }
       }).populate("messages");

   if(!conservation){
       return res.status(201).json([]);
   }    
   
   const messages=conservation.messages;
   res.status(201).json(messages);
       

    } catch (error) {
        console.error("Error in Gettingmessages:", error);
        res.status(500).json("Internal server error");
    }
}