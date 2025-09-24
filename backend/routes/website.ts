import { Router } from "express";
import { website_controller } from "../controllers";

export const websiteRouter=Router();

websiteRouter.post("/:id",website_controller.website_add);