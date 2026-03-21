import "./index.css";

const InsightCards = ({ expenses = [] }) => {

  const totalIncome = expenses
  .filter((item) => item.type === "Income")
  .reduce((total, item) => total + Number(item.amount), 0);

const totalExpense = expenses
  .filter((item) => item.type === "Expense")
  .reduce((total, item) => total + Number(item.amount), 0);

  return (
    <div className="insight-cards">

      <div className="card balance">
        <h3>Balance</h3>
        <p>₹{balance}</p>
      </div>

      <div className="card income">
        <h3>Total Income</h3>
        <p>₹{totalIncome}</p>
      </div>

      <div className="card expense">
        <h3>Total Expense</h3>
        <p>₹{totalExpense}</p>
      </div>

    </div>
  );
};

export default InsightCards;