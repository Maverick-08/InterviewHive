import { Router } from "express";
import { userAuthController } from "../controllers/controller.auth";

const router = Router();

router.route("/")
    .post(userAuthController)

export default router;