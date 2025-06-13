import { Router } from "express";
import { getAllInterviewsController } from "../controllers/controller.interview.getAllInterviews";
import { addInterviewsController } from "../controllers/controller.interview.addInterviewExperienxe";
import { getFilteredInterviewsController } from "../controllers/contoller.interview.getFilteredInterviewsContoller";


const router = Router();

// get all interviews
router.route("/")
    .get(getAllInterviewsController)

// get filtered interviews
router.route("/filter")
    .get(getFilteredInterviewsController)


// add interview experience
router.route("/add")
    .post(addInterviewsController)

export default router;