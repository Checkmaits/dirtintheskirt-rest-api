import { Router } from "express";
import * as controller from "../controllers/message.controller.js";
import apiKeyMiddleware from "../middlewares/apiKey.middleware.js";

const router = Router();

router.post("/create", apiKeyMiddleware, controller.createMessage);

export default router;
