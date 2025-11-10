'use client'

import { Expense } from '@/lib/types'

interface ExpenseItemProps {
  expense: Expense
  onEdit: () => void
  onDelete: () => void
}

export default function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{expense.description}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{expense.category}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formatDate(expense.date)}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-red-600 dark:text-red-400">{formatAmount(expense.amount)}</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}