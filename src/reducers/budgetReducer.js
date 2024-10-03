export const initialState = {
    expenses: [],
    budgetLimits: {},
  };
  
  export function budgetReducer(state, action) {
    switch (action.type) {
      case 'ADD_EXPENSE':
        return {
          ...state,
          expenses: [...state.expenses, action.payload],
        };
      case 'UPDATE_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.map((expense) =>
            expense.id === action.payload.id ? action.payload : expense
          ),
        };
      case 'DELETE_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.filter((expense) => expense.id !== action.payload),
        };
      case 'SET_BUDGET_LIMIT':
        return {
          ...state,
          budgetLimits: {
            ...state.budgetLimits,
            [action.payload.category]: action.payload.limit,
          },
        };
      default:
        return state;
    }
  }