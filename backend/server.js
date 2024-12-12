// import express from "express";
// import ConnectMongoose from "./db/ConnectMongoose.js";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import cors from 'cors';
// import path from "path";
// const __dirname=path.resolve();

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import { app, server } from "./socket/socket.js"; // Use the same server from soket.js

// dotenv.config();

// const PORT = process.env.PORT || 3000;
// console.log("Environment variable PORT:", process.env.PORT);

  
// app.use(cors({
//     origin: "http://localhost:3000", // Change this to your frontend URL
//     credentials: true,
//   }));
//   app.use(express.json());
// app.use(cookieParser());

// app.use('/',(req,res)=>{
//     res.send(200).json({"message":"Server is live!"})
// })

// app.use("/api/auth", authRoutes); 
// app.use("/api/message", messageRoutes);
// app.use("/api/user", userRoutes);
// app.use(express.static(path.join(__dirname,"/frontend/dist")))

// server.listen(PORT, () => {
//     ConnectMongoose();
//     console.log(`Server is running on port ${PORT}`);
// });
import express from "express";
import ConnectMongoose from "./db/ConnectMongoose.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";

const allowedOrigins = [
    'https://chat-app-frontend-new.onrender.com',
    'http://localhost:5173'
  ];
  
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(new Error('Not allowed by CORS')); // Block request
      }
    },
    credentials: true, // If you need cookies/auth headers
  }));
  

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
