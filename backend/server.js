import express from "express";
import ConnectMongoose from "./db/ConnectMongoose.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js"; // Use the same server from soket.js

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3000;
console.log("Environment variable PORT:", process.env.PORT);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes); 
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

server.listen(PORT, () => {
    ConnectMongoose();
    console.log(`Server is running on port ${PORT}`);
});
