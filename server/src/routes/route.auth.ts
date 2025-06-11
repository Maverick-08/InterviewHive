import { Router } from "express";
import { refreshTokenHandler } from "../controllers/controller.refreshToken";

const router = Router();

router.route("/")
    .post(refreshTokenHandler)

export default router;