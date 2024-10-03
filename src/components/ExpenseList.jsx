import React, { useState } from 'react';

function ExpenseList({ expenses, dispatch }) {
  const [filter, setFilter] = useState({ category: '', startDate: '', endDate: '' });

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredExpenses = expenses.filter((expense) => {
    return (
      (!filter.category || expense.category.toLowerCase().includes(filter.category.toLowerCase())) &&
      (!filter.startDate || expense.date >= filter.startDate) &&
      (!filter.endDate || expense.date <= filter.endDate)
    );
  });

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <div className="filters">
        <input
          type="text"
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          placeholder="Filter by category"
        />
        <input
          type="date"
          name="startDate"
          value={filter.startDate}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="endDate"
          value={filter.endDate}
          onChange={handleFilterChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;