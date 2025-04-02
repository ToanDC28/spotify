import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";

const router = Router();

// it add the protectRoute, requireAdmin like a middleware
// it will execute before the request come to controller
router.use(protectRoute, requireAdmin); 

router.get("/check", checkAdmin);

router.post("/song/create", createSong)

router.delete("/song/delete/:id", deleteSong);

router.post("/album/create", createAlbum);

router.post("/album/:id", deleteAlbum);

export default router;