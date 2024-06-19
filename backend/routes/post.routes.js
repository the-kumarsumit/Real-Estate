import { Router } from "express";

const router = Router()

router.get("/test",(req,res)=>{
    console.log("Router Works");
})

export default router;