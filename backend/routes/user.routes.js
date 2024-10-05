import express from "express";
import protectedroute from "../middleware/protectedroute.js";
import { getallusersforsidebar } from "../controllers/user.controller.js";

const router=express.Router();

router.get("/:id",protectedroute,getallusersforsidebar);

export default router;