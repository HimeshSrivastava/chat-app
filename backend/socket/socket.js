import { Server } from 'socket.io'; // Correct import
import http from 'http'; 
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://chat-app-deployed-9vyb.onrender.com/"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {};
export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id; // Update map when user connects
    }


    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
       
                delete userSocketMap[userId];
                io.emit("getOnlineUsers", Object.keys(userSocketMap));
        
    });
});

export { app, io, server };
