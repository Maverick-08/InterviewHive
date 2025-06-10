import { Router } from "express";
import { userRegistrationController } from "../controllers/controller.register";

const router = Router();

router.route("/")
    .post(userRegistrationController)

export default router;