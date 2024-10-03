import React, { useReducer } from 'react';
import BudgetDashboard from './components/BudgetDashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetSummary from './components/BudgetSummary';
import { budgetReducer, initialState } from './reducers/budgetReducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <div className="App">
      <h1>Save Smart</h1>
      <div className="dashboard-container">
        <BudgetDashboard state={state} />
        <ExpenseForm dispatch={dispatch} />
      </div>
      <ExpenseList expenses={state.expenses} dispatch={dispatch} />
      <BudgetSummary expenses={state.expenses} budgetLimits={state.budgetLimits} />
    </div>
  );
}

export default App;