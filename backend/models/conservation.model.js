import mongoose from "mongoose";

const conservationschema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    messages: [{  // Changed 'message' to 'messages'
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }],
}, { timestamps: true });

const Conservation = mongoose.model("Conservation", conservationschema);

export default Conservation;
