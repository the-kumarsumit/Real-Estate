import { Router } from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, upload.array('images') , addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;