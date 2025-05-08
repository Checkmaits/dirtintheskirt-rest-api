import { Router } from "express";
import * as controller from "../controllers/sponsor.controller.js";

const router = Router();

router.get("/", controller.getSponsors);
router.get("/deck", controller.getSponsorshipDeck);

export default router;
