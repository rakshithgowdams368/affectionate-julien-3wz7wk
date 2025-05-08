import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const TransactionForm = ({ onAddTransaction }) => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description) {
      alert('Please fill in all fields.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      description,
    };

    onAddTransaction(newTransaction);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold text-gray-700">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="mb-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="0.00"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Transaction description"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {type === 'income' ?  <span> Add Income <Plus className="inline-block ml-1"/></span>: <span>Add Expense <Minus className="inline-block ml-1"/></span>}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
