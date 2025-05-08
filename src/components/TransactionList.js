import React from 'react';
import { Trash } from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold text-gray-700">Transactions</h2>
      <ul className="mt-2 divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-2 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">{transaction.description}</p>
              <p className="text-xs text-gray-500">{transaction.type}</p>
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                ${transaction.amount.toFixed(2)}
              </span>
              <button onClick={() => onDeleteTransaction(transaction.id)} className="ml-4 text-red-500 hover:text-red-700">
                <Trash className="h-4 w-4"/>
              </button>
            </div>
          </li>
        ))}
          {transactions.length === 0 && <li className="py-2 text-gray-500 text-center">No transactions yet.</li>}
      </ul>
    </div>
  );
};

export default TransactionList;
