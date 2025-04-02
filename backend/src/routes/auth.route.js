import { Router } from "express";
import { User } from "../models/user.model.js";
import { authCallback } from "../controller/auth.controller.js";

const router = Router();

router.post("/call-back", authCallback)

export default router;