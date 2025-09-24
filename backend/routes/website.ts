import { Router } from "express";
import { website_controller } from "../controllers";
import { authMiddleware } from "../middlewares/auth-middleware";

export const websiteRouter=Router();

websiteRouter.post("/add",authMiddleware,website_controller.website_add);
websiteRouter.get("/status/:websiteId",authMiddleware,website_controller.website_status);