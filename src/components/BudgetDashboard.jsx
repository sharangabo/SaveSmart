import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetDashboard({ state }) {
  const { expenses, budgetLimits } = state;

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
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="budget-dashboard">
      <h2>Budget Overview</h2>
      <div className="chart-container">
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className="budget-alerts">
        {Object.entries(categoryTotals).map(([category, total]) => {
          const limit = budgetLimits[category] || 0;
          const percentageUsed = limit ? (total / limit) * 100 : 0;
          let alertClass = '';
          if (percentageUsed >= 90) alertClass = 'alert-danger';
          else if (percentageUsed >= 75) alertClass = 'alert-warning';

          return (
            <div key={category} className={`budget-alert ${alertClass}`}>
              <span>{category}: </span>
              <span>${total.toFixed(2)} / ${limit.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetDashboard;