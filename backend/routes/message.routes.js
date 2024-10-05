import express from "express";
import { getallmessagesofconservation, sendmessages } from "../controllers/messages.controller.js";
import protectedroute from "../middleware/protectedroute.js";

const router=express.Router();

router.post("/send/:id",protectedroute,sendmessages);
router.get("/:id",protectedroute,getallmessagesofconservation);

export default router;