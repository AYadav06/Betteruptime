import { Router } from "express";
import { user_controller } from "../controllers";
export const userRouter=Router();

userRouter.post("/signup",user_controller.create_user);
userRouter.post("signin",user_controller.sigin_user)

