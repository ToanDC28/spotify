import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getAllSongs, getFeatureSongs, getMadeForYou, getTrending } from "../controller/song.controller.js";

const router = Router();

router.get("/:pageNum&:pageSize", protectRoute, requireAdmin, getAllSongs);
router.get("/feature", protectRoute, getFeatureSongs);
router.get("/made-for-you", protectRoute, getMadeForYou);
router.get("/trending", protectRoute, getTrending);
export default router;