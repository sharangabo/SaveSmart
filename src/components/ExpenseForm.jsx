import React, { useState } from 'react';

function ExpenseForm({ dispatch }) {
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_EXPENSE',
      payload: { ...expense, id: Date.now(), amount: parseFloat(expense.amount) },
    });
    setExpense({ amount: '', category: '', date: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        name="category"
        value={expense.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        value={expense.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;