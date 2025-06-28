import { Router } from "express";
import { viewCountHandler } from "../controllers/controller.viewCount";

const router = Router();

router.route("/").get(viewCountHandler);

export default router;