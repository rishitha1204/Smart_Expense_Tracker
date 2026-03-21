import axios from "axios";

// ✅ Live Render backend URL
const BASE_URL = "https://smart-expense-tracker-1-ybx9.onrender.com";

// ✅ Helper to get Authorization header
const getAuthConfig = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // updated storage key
  const token = userInfo?.token;

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Get Expenses
export const getExpenses = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/expenses`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Get Expenses Error:", err.response?.data || err);
    throw err;
  }
};

// ✅ Add Expense
export const addExpense = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/expenses`, data, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error("Add Expense Error:", err.response?.data || err);
    throw err;
  }
};