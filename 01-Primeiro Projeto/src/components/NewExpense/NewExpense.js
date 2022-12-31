import './NewExpense.css';

import ExpenseForm from './ExpenseForm';

import { useState } from 'react';

function NewExpense (props) {
  const [isEditing, setIsEditing] = useState(false);

  function saveExpenseDataHandler(enteredExpenseData) {
    const expenseData = {
      ...enteredExpenseData,
        id: Math.random().toString()
    };
    props.onAddExpense(expenseData);
  };

  function startEditingHandler() {
    setIsEditing(true);
  }

  function stopEditingHandler() {
    setIsEditing(false);
  }
  
  return (
    <div className='new-expense'>
      {!isEditing && <button onClick={startEditingHandler}>Add new Expense</button>}
      {isEditing && <ExpenseForm onCancel={stopEditingHandler} onSaveExpenseData={saveExpenseDataHandler}/>}
    </div>
  );
};
  
  export default NewExpense;