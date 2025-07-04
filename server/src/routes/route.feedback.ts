import { Router } from "express";
import { addReviewHandler } from "../controllers/controller.feedback";

const router = Router();

router.route("/").post(addReviewHandler);

export default router;