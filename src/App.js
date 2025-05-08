import React, { useState, useEffect } from 'react';
import BudgetSummary from './components/BudgetSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Home, Plus, Minus, Upload, Download } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const incomeTotal = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    setIncome(incomeTotal);

    const expenseTotal = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    setExpenses(expenseTotal);
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Budget Overview',
        data: [income, expenses],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center">Budget Tracking App <Home className="inline-block text-blue-500"/></h1>
            </div>
            <div className="divide-y divide-gray-200">
              <BudgetSummary income={income} expenses={expenses} />
              <TransactionForm onAddTransaction={addTransaction} />
              <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
              <div className='mt-4'>
                <Pie data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
