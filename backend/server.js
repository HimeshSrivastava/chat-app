import express from "express";
import ConnectMongoose from "./db/ConnectMongoose.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { app, server } from "./socket/socket.js"; // Importing app & server from socket.js

dotenv.config();

const allowedOrigins = [
  "https://chat-app-ne.onrender.com",
  "http://localhost:5174",
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve();

// Routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Start Server (Use `server.listen()` instead of `app.listen()`)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  ConnectMongoose();
  console.log(`Server is running on port ${PORT}`);
});
