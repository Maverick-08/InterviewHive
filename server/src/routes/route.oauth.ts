import { Router } from "express";
import { oAuthHandler } from "../controllers/controller.oauth";

const router = Router();

router.route("/").post(oAuthHandler);

export default router;