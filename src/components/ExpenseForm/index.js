import { useState } from "react";
import { addExpense } from "../../api/expenseApi";
import "./index.css";

const ExpenseForm = ({ fetchExpenses }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("General");
  const [type, setType] = useState("expense");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !amount) {
    alert("Please fill required fields");
    return;
  }

  try {
    await addExpense({
      title,
      amount: Number(amount),
      date: date || new Date(),
      category,
      type,
    });

    // append new expense locally instead of waiting for fetch
    await fetchExpenses(); // optional: refetch all expenses
    // OR:
    // setExpenses(prev => [...prev, newExpense]);

    // clear form
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("General");
    setType("expense");

    alert("Expense added successfully ✅");

  } catch (error) {
    console.error(error);
    alert("Failed to add expense ❌");
  }
};

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>General</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>House Rent</option>
        <option>Entertainment</option>
        <option>Shopping</option>
        <option>Health</option>
        <option>Education</option>
        <option>Other</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
};

export default ExpenseForm;