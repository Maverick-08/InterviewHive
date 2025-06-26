import {Router} from "express";
import { chatbotontroller } from "../controllers/controller.chatbot";

const router = Router();

router.route("/").post(chatbotontroller);

export default router;