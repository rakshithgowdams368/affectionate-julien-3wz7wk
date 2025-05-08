import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const BudgetSummary = ({ income, expenses }) => {
  const balance = income - expenses;

  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold text-gray-700">Summary</h2>
      <div className="mt-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Income <ArrowUp className="inline-block text-green-500"/></span>
          <span className="text-sm text-green-600">${income.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Expenses <ArrowDown className="inline-block text-red-500"/></span>
          <span className="text-sm text-red-600">${expenses.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-md font-semibold text-gray-700">Balance</span>
          <span className={`text-md font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
