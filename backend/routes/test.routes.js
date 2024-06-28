import {Router} from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/should_be_logged_in", verifyToken, shouldBeLoggedIn);

router.get("/should_be_admin", shouldBeAdmin);

export default router;
