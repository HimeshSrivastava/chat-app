import express from "express";
import { getallmessagesofconservation, sendmessages, deletemessage } from "../controllers/messages.controller.js";
import protectedroute from "../middleware/protectedroute.js";

const router=express.Router();

router.post("/send/:id",protectedroute,sendmessages);
router.get("/:id",protectedroute,getallmessagesofconservation);
router.delete("/delete/:id",protectedroute,deletemessage);


export default router;