// import { Server } from 'socket.io'; 
// import http from 'http'; 
// import express from 'express';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173", "https://your-frontend-domain.com"], // Include your frontend domain
//         methods: ["GET", "POST"],
//     },
// });

// const userSocketMap = {};
// export const getReceiverSocketId=(receiverId)=>{
//     return userSocketMap[receiverId];
// }

// io.on('connection', (socket) => {
//     console.log("User connected:", socket.id);
//     const userId = socket.handshake.query.userId;

//     if (userId && userId !== "undefined") {
//         userSocketMap[userId] = socket.id; 
//     }


//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
       
//                 delete userSocketMap[userId];
//                 io.emit("getOnlineUsers", Object.keys(userSocketMap));
        
//     });
// });

// export { app, io, server };
import { Server } from 'socket.io'; 
import http from 'http'; 
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://your-frontend-domain.com"], // Adjust as needed
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; 

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);
    
    const userId = socket.handshake.query.userId;
    
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        
        // Remove user from the map only if it exists
        for (const [key, value] of Object.entries(userSocketMap)) {
            if (value === socket.id) {
                delete userSocketMap[key];
                break;
            }
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
