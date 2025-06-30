import { Router } from "express";
import { resetPasswordHandler } from "../controllers/controller.resetPassword";
import { changePasswordHandler } from "../controllers/controller.changePassword";

const router = Router();

router.route("/").get(resetPasswordHandler);

router.route("/").post(changePasswordHandler);

export default router;