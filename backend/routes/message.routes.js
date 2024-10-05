import express from "express";
import { sendmessages } from "../controllers/messages.controller.js";
import protectedroute from "../middleware/protectedroute.js";

const router=express.Router();

router.post("/send/:id",protectedroute,sendmessages);

export default router;