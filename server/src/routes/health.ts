import { Request, Response, Router } from "express";
import { serverHealthHandler } from "../controllers/healthCheckpointController";

const router = Router();

router.route("/").get(serverHealthHandler);

export default router;