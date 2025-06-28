import { Router } from "express";
import { userRegistrationController } from "../controllers/controller.register";
import { sendOtpHandler } from "../controllers/controller.sendOtp";

const router = Router();

router.route("/")
    .post(userRegistrationController)

router.route("/sendOtp").get(sendOtpHandler);

export default router;