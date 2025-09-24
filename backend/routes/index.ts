import { Router, type Request, type Response } from "express";
import { userRouter } from "./user";
import { websiteRouter } from "./website";

export const router=Router();


router.use("/user",userRouter);
router.use("/website",websiteRouter);