import React, { useEffect, useState } from "react";
import BudgetSummary from "../components/BudgetSummary";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import MonthlyBarChart from "../components/Charts/MonthlyBarChart";
import IncomeExpenseChart from "../components/Charts/IncomeExpenseChart";
import { getExpenses } from "../api/expenseApi";

import "./auth.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
  try {
    const data = await getExpenses(); // getExpenses already returns array
    setExpenses(data);                // set directly
  } catch (error) {
    console.error("Error fetching expenses:", error);
    setExpenses([]);
  }
};

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ Safe totalSpent calculation
  const totalSpent = (expenses || [])
  .filter((item) => item?.type?.toLowerCase() === "expense")
  .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <div className="dashboard">

      {/* 🔹 TOP SUMMARY */}
      <div className="top-cards">
        <BudgetSummary expenses={expenses} />
      </div>

      {/* 🔹 CHARTS */}
      <div className="charts-section">
        <div className="chart-card">
          <CategoryPieChart expenses={expenses} />
        </div>
        <div className="chart-card">
          <MonthlyBarChart expenses={expenses} />
        </div>
        <div className="chart-card">
          <IncomeExpenseChart expenses={expenses} />
        </div>
      </div>

      {/* 🔹 TOTAL SPENT */}
      <div className="total-spent">
        <h3>Total Spent: ₹{totalSpent.toFixed(2)}</h3>
      </div>

      {/* 🔹 BOTTOM SECTION */}
      <div className="bottom-section">
        <div className="left">
          <ExpenseForm fetchExpenses={fetchExpenses} />
        </div>
        <div className="right">
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;