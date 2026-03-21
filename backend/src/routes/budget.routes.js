import express from "express";
import protect from "../middleware/auth.middleware.js";
import { setBudget } from "../controllers/budget.controller.js";

const router = express.Router();

router.post("/", protect, setBudget);

export default router;