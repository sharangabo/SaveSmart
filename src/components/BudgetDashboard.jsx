import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetDashboard({ state, updateBudgetLimits }) {
  const { expenses, budgetLimits } = state;
  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
      },
    ],
  };

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (newCategory && newLimit) {
      updateBudgetLimits({
        ...budgetLimits,
        [newCategory]: parseFloat(newLimit)
      });
      setNewCategory('');
      setNewLimit('');
    }
  };

  return (
    <div className="budget-dashboard">
      <h2>Budget Overview</h2>
      
      <div className="budget-form">
        <h3>Set New Budget</h3>
        <form onSubmit={handleAddBudget}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category"
            required
          />
          <input
            type="number"
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
            placeholder="Limit"
            required
          />
          <button type="submit">Add Budget</button>
        </form>
      </div>

      <div className="chart-container">
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <div className="budget-alerts">
        <h3>Budget Status</h3>
        {Object.entries(budgetLimits).map(([category, limit]) => {
          const total = categoryTotals[category] || 0;
          const percentageUsed = limit ? (total / limit) * 100 : 0;
          let alertClass = '';
          if (percentageUsed >= 90) alertClass = 'alert-danger';
          else if (percentageUsed >= 75) alertClass = 'alert-warning';

          return (
            <div key={category} className={`budget-alert ${alertClass}`}>
              <span>{category}: </span>
              <span>${total.toFixed(2)} / ${limit.toFixed(2)} ({percentageUsed.toFixed(2)}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetDashboard;