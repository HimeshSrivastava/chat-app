import mongoose from "mongoose";

const messageschema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true, 
    },
}, { timestamps: true });
//model name should be in Capital Letter like Message
const Message = mongoose.model("Message", messageschema);

export default Message;
