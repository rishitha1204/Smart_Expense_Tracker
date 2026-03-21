import Expense from "../models/expense.model.js";

export const getReport = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  res.json({ totalExpenses: total });
};