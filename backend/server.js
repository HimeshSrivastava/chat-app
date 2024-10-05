import express from "express"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import ConnectMongoose from "./db/ConnectMongoose.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
const app=express();

dotenv.config({ path: '../.env' });

const PORT= process.env.PORT || 3000;
console.log("Environment variable PORT:", process.env.PORT);

app.use(express.json());
app.use(cookieParser());
// app.get("/",(req,res)=>{
//     res.send("Hello Everyone");
// })

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

app.listen(PORT,()=>{
    ConnectMongoose();
    console.log(`server is running ${PORT}`);
})
