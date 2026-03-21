import "./index.css";

const BudgetSummary = ({ expenses = [] }) => {

  let income = 0;
  let expense = 0;

  expenses.forEach((item) => {

    if (item.type === "income") {
      income += item.amount;
    } else {
      expense += item.amount;
    }

  });

  const balance = income - expense;

  const percentage =
    income > 0 ? Math.round((expense / income) * 100) : 0;

  return (

    <div className="budget-summary">

      <h2>Budget Summary</h2>

      <div className="summary-cards">

        <div className="summary-card income">
          <p>Total Income</p>
          <h3>₹{income}</h3>
        </div>

        <div className="summary-card expense">
          <p>Total Expense</p>
          <h3>₹{expense}</h3>
        </div>

        <div className="summary-card balance">
          <p>Remaining Balance</p>
          <h3>₹{balance}</h3>
        </div>

      </div>

      <div className="progress-bar">

        <div
          className="progress"
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

      <p className="progress-text">
        {percentage}% of income spent
      </p>

    </div>

  );

};

export default BudgetSummary;