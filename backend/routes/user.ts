import { Router, type Request, type Response } from "express";
import { prisma } from "../config/db";

export const userRouter=Router();


userRouter.post("/signup",async(req:Request,res:Response)=>{

})
