import axios from "axios";

const API = "http://localhost:5000/api/expenses";

// ✅ Get Expenses
export const getExpenses = async () => {
  const token = localStorage.getItem("token");

  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Add Expense
export const addExpense = async (data) => {
  const token = localStorage.getItem("token");

  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};