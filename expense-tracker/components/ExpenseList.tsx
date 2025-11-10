'use client'

import { Expense } from '@/lib/types'
import ExpenseItem from './ExpenseItem'

interface ExpenseListProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

export default function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No expenses recorded yet.</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Add your first expense above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Expenses</h2>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={() => onEdit(expense)}
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </div>
  )
}