import { Router } from "express";
import { getAlbumById, getAllAlbum } from "../controller/album.controller.js";

const router = Router();

router.get("/:pageNum&:pageSize", getAllAlbum);
router.get("/:id", getAlbumById);


export default router;