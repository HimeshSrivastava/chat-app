import express from "express";
import protectedroute from "../middleware/protectedroute.js";
import {getAllUsersForSidebar} from "../controllers/user.controller.js"

const router=express.Router();

router.get("/",protectedroute,getAllUsersForSidebar);

export default router;