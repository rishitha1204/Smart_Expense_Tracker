import { FaTrash } from "react-icons/fa";
import axios from "axios";
import "./index.css";

const ExpenseList = ({ expenses, setExpenses }) => {

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setExpenses(expenses.filter((item) => item._id !== id));

  } catch (error) {
    console.log("Delete failed", error);
  }
};
  if (expenses.length === 0) {
    return <p className="no-expenses">No transactions yet</p>;
  }

  return (
    <div className="expense-list-container">

      <h2 className="expense-title">Recent Transactions</h2>

      <div className="expense-grid">

        {expenses.map((item) => (

          <div
            key={item._id}
            className={`expense-card ${item.type}`}
          >

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