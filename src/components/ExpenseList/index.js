import { FaTrash } from "react-icons/fa";
import axios from "axios";
import "./index.css";

// ✅ Live backend URL
const BASE_URL = "https://smart-expense-tracker-1-ybx9.onrender.com";

// ✅ Helper to get token header
const getAuthConfig = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

const ExpenseList = ({ expenses, setExpenses }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/expenses/${id}`, getAuthConfig());

      // Remove from local state
      setExpenses(expenses.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed", error.response?.data || error);
      alert("Failed to delete expense ❌");
    }
  };

  if (!expenses || expenses.length === 0) {
    return <p className="no-expenses">No transactions yet</p>;
  }

  return (
    <div className="expense-list-container">
      <h2 className="expense-title">Recent Transactions</h2>

      <div className="expense-grid">
        {expenses.map((item) => (
          <div key={item._id} className={`expense-card ${item.type}`}>
            <div className="expense-header">
              <h3>{item.title}</h3>
              <span className="amount">₹{item.amount}</span>
            </div>

            <div className="expense-footer">
              <p>{item.category}</p>
              <p>{new Date(item.date).toLocaleDateString()}</p>
            </div>

            <button
              onClick={() => handleDelete(item._id)}
              className="delete-btn"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;