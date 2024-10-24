import express from "express";
import ConnectMongoose from "./db/ConnectMongoose.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";
const __dirname=path.resolve();

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js"; // Use the same server from soket.js

dotenv.config();

const PORT = process.env.PORT || 3000;
console.log("Environment variable PORT:", process.env.PORT);
const corsOptions = {
    origin: 'https://chat-app-deployed-9vyb.onrender.com', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
  };
  
  app.use(cors(corsOptions));app.use(express.json());
app.use(cookieParser());

app.use('/',(req,res)=>{
    res.send(200).json({"message":"Server is live!"})
})

app.use("/api/auth", authRoutes); 
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")))

server.listen(PORT, () => {
    ConnectMongoose();
    console.log(`Server is running on port ${PORT}`);
});
