import { Router, type Request, type Response } from "express";
import { userRouter } from "./user";

export const router=Router();


router.use("/user",userRouter);