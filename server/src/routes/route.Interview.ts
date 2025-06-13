import { Router } from "express";
import { getAllInterviewsController } from "../controllers/controller.interview.getAllInterviews";
import { addInterviewsController } from "../controllers/controller.interview.addInterviewExperienxe";
import { getFilteredInterviewsController } from "../controllers/controller.interview.getFilteredInterviews";
import { getUserInterviewsController } from "../controllers/controller.interviews.getUserInterviews";
import { getInterviewByIdController } from "../controllers/controller.interview.getInterviewById";
import { deleteInterviewByIdController } from "../controllers/controller.interview.deleteUserInterview";
import { updateInterviewExperienceController } from "../controllers/controller.interview.updateInterviewExperience";

const router = Router();

// get all interviews or interviews filtered by company name
router.route("/").get(getAllInterviewsController);

// get filtered interviews - tags + company name
router.route("/filter").get(getFilteredInterviewsController);

// get user interviews
router.route("/user").get(getUserInterviewsController);

// get particular interview through interview id - for updation / edit
router.route("/detail").get(getInterviewByIdController);

// delete interview experience
router.route("/delete").get(deleteInterviewByIdController);

// update interview experience
router.route("/update").post(updateInterviewExperienceController);

// add interview experience
router.route("/add").post(addInterviewsController);

export default router;
