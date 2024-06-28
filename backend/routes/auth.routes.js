import { Router } from "express";
import { generateOtp, login, logout, register } from "../controllers/auth.controller.js";

const router = Router()
router.post("/generateOtp",generateOtp)
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);


export default router;