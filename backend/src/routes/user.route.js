import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessage } from "../controller/user.controller.js";

const router = Router();

router.get('/', protectRoute, getAllUsers);
router.get('/message/:userId', protectRoute, getMessage);

export default router;