import { Router } from "express";
import { getAllInterviewsController } from "../controllers/controller.getAllInterviews";
import { addInterviewsController } from "../controllers/controller.addInterviewExperienxe";

const router = Router();

// get all interviews
router.route("/")
    .get(getAllInterviewsController)


// add interview experience
router.route("/add")
    .post(addInterviewsController)

export default router;