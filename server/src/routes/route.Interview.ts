import { Router } from "express";
import { getAllInterviewsController } from "../controllers/controller.interview.getAllInterviews";
import { addInterviewsController } from "../controllers/controller.interview.addInterviewExperienxe";
import { getFilteredInterviewsController } from "../controllers/contoller.interview.getFilteredInterviewsContoller";
import { getUserInterviewsController } from "../controllers/contoller.interviews.getUserInterviews";
import { getInterviewByIdController } from "../controllers/controller.interview.getInterviewById";


const router = Router();

// get all interviews or interviews filtered by company name
router.route("/")
    .get(getAllInterviewsController)

// get filtered interviews - tags + company name
router.route("/filter")
    .get(getFilteredInterviewsController)

// get user interviews
router.route("/user")
    .get(getUserInterviewsController)

// get particular interview through interview id - for updation / edit
router.route("/detail")
    .get(getInterviewByIdController)


// add interview experience
router.route("/add")
    .post(addInterviewsController)

export default router;