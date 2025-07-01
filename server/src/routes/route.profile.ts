import { Router } from "express";
import { profileUpdateController } from "../controllers/controller.profile.update";

const router = Router();

router.route("/update").post(profileUpdateController)

export default router