import express from "express";
import ConnectMongoose from "./db/ConnectMongoose.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Allows cookies & headers like Authorization
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Restrict allowed methods
    allowedHeaders: ["Authorization", "Content-Type"], // ✅ Allow specific headers
  })
);

app.use(express.json()); // ✅ Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded bodies

const __dirname = path.resolve();

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js"; // Use the same server from socket.js

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cookieParser()); 
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.listen(PORT, () => {
    ConnectMongoose();
    console.log(`Server is running on port ${PORT}`);
});
