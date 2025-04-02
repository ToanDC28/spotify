import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getAllSongs, getFeatureSongs, getMadeForYou, getTrending } from "../controller/song.controller.js";

const router = Router();

router.get("/:pageNum&:pageSize", protectRoute, requireAdmin, getAllSongs);
router.get("/feature", protectRoute, requireAdmin, getFeatureSongs);
router.get("/made-for-you", protectRoute, requireAdmin, getMadeForYou);
router.get("/trending", protectRoute, requireAdmin, getTrending);
export default router;