import { Router } from "express";
import { addInterviewsController } from "../controllers/controller.interview.addInterviewExperienxe";
import { getUserInterviewsController } from "../controllers/controller.interviews.getUserInterviews";
import { getInterviewByIdController } from "../controllers/controller.interview.getInterviewById";
import { deleteInterviewByIdController } from "../controllers/controller.interview.deleteUserInterview";
import { updateInterviewExperienceController } from "../controllers/controller.interview.updateInterviewExperience";
import { getSavedInterviewsController } from "../controllers/controller.interview.getSavedInterviews";
import { saveInterviewController } from "../controllers/controller.save.saveInterview";
import { getInterviewTags } from "../controllers/controller.interview.interviewTags";
import { getAllInterviewsController } from "../controllers/controller.interview.getAllInterviews";
import { getBookmarkStats } from "../controllers/controller.interview.bookmarkStats";

const router = Router();

// get all interview tags
router.route("/tags").get(getInterviewTags);

// get all interviews or filtered interviews
router.route("/").get(getAllInterviewsController);

// get interviews created by user
router.route("/user").get(getUserInterviewsController);

// get saved interviews of users
router.route("/user/save").get(getSavedInterviewsController);

// save/unsave interviews
router.route("/save").get(saveInterviewController);

// bookmark stats
router.route("/save/stats").get(getBookmarkStats);

// get particular interview through interview id - for updation / edit
router.route("/detail").get(getInterviewByIdController);

// delete interview experience
router.route("/delete").get(deleteInterviewByIdController);

// update interview experience
router.route("/update").post(updateInterviewExperienceController);

// add interview experience
router.route("/add").post(addInterviewsController);

export default router;
