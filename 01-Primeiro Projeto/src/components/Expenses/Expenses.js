import './Expenses.css';

import Card from '../UI/Card';
import ExpenseFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';
import ExpensesList from './ExpensesList';

import { useState } from 'react';

function Expenses(props) {
    const [filteredYear, setFilteredYear] = useState('2022');

    const filteredExpenses = props.items.filter(expense => {
        return expense.date.getFullYear().toString() === filteredYear;
    });

    function filterChangeHandler(selectedYear) {
        setFilteredYear(selectedYear);
    }

    return (
        <Card className="expenses">
            <ExpenseFilter onChangeFilter={filterChangeHandler} selected={filteredYear}/>

            <ExpensesChart expenses={filteredExpenses}/>

            <ExpensesList items={filteredExpenses}/>
        </Card>
    );
}

export default Expenses;