import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getStatus } from "../controller/status.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStatus);

export default router;