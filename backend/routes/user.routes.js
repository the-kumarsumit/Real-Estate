import { Router } from "express";
import {verifyToken} from "../middleware/verifyToken.js"
import { deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";

const router = Router()

router.get("/",getUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
// router.post("/save", verifyToken, savePost);
// router.get("/profilePosts", verifyToken, profilePosts);
// router.get("/notification", verifyToken, getNotificationNumber);


export default router;