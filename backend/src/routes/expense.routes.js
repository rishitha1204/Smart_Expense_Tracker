import express from "express";
import { createExpense, getExpenses } from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import Expense from "../models/expense.model.js";

const router = express.Router();

router.post("/", protect, createExpense);
router.get("/", protect, getExpenses);

// ✅ THIS MUST EXIST
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;