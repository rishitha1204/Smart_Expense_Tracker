import Budget from "../models/budget.model.js";

export const setBudget = async (req, res) => {
  const budget = await Budget.create({
    ...req.body,
    user: req.user._id
  });

  res.json(budget);
};