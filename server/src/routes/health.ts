import { Request, Response, Router } from "express";
import { serverHealthHandler } from "../controllers/controller.health";

const router = Router();

router.route("/").get(serverHealthHandler);

export default router;