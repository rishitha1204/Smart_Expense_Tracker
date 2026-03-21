const calculateScore = (totalExpense, totalBudget) => {
  if (totalExpense > totalBudget) return "Over Budget";
  return "Good";
};

export default calculateScore;