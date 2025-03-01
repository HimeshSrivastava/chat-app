import Message from "../models/message.model.js";
import Conservation from "../models/conservation.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { Types } from 'mongoose';

export const sendmessages = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; //assigning the value of id to receiverId 
        const senderId = req.user._id;  // Sender's ID from the middleware i.e protectedroute


        let conservation = await Conservation.findOne({
            participants: {
                $all: [receiverId, senderId],
            }
        });

       
        if (!conservation) {
            conservation = await Conservation.create({
                participants: [receiverId, senderId],
                messages: []  // Initialize an empty messages array
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save();

        conservation.messages.push(newMessage._id);  
        await conservation.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


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

export const deletemessage =async(req,res)=>{
    try {
        const {id} =req.params;
        console.log(id);
        const messageId = new Types.ObjectId(id);
        const deletedMessage = await Message.findOneAndDelete({ _id: messageId });

        if (!deletedMessage) {
          return res.status(404).json({ success: false, message: "Message not found" });
        }
    
        res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
            console.error("Error deleting message:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
          
    }
}