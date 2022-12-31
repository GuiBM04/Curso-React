import './App.css';

import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

import { useState } from 'react';

const initialExpenses = [
  {
    id: 'e1',
    title: "Toilet Papaer",
    amount: 94.12,
    date: new Date(2022, 7, 14),
  },
  {
    id: 'e2',
    title: "New TV",
    amount: 799.49,
    date: new Date(2022, 2, 12),
  },
  {
    id: 'e3',
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2022, 2, 28),
  },
  {
    id: 'e4',
    title: "New Desk",
    amount: 450,
    date: new Date(2022, 5, 12),
  },
];

function App() {
  const [expenses, setExpense] = useState(initialExpenses);

  function addExpensesHandler(expense) {
    setExpense(prevExpenses => {
      return [expense, ...prevExpenses];
    });
  }

  return (
    <div>
      <header className="App-header">
        <NewExpense onAddExpense={addExpensesHandler}/>

        <Expenses items={expenses}/>
      </header>
    </div>
  );
}

export default App;
