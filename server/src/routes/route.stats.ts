import { Router } from "express";
import { getDashboardStatsController, getTrendingTopicsStats } from "../controllers/controller.stats";

const router = Router();

router.route("/dashboard")
    .get(getDashboardStatsController);

router.route("/trending")
    .get(getTrendingTopicsStats);

export default router;