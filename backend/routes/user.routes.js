import { Router } from "express";
import {verifyToken} from "../middleware/verifyToken.js"
import { deleteUser, getUsers, profilePosts, savePost, updateUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.get("/",getUsers);
router.put("/:id", verifyToken, upload.single('avatar'), updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
// router.get("/notification", verifyToken, getNotificationNumber);


export default router;