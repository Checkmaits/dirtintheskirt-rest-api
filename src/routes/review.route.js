import { Router } from "express";
import * as controller from "../controllers/review.controller.js";

const router = Router();

router.get("/", controller.getReviews);

export default router;
