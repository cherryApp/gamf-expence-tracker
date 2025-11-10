'use client'

import { useState } from 'react'
import { ExpenseFormData } from '@/lib/types'

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void
  initialData?: ExpenseFormData
  isEditing?: boolean
}

const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Healthcare',
  'Education',
  'Other'
]

export default function ExpenseForm({ onSubmit, initialData, isEditing = false }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: initialData?.amount || 0,
    description: initialData?.description || '',
    category: initialData?.category || '',
    date: initialData?.date || new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    if (!isEditing) {
      setFormData({
        amount: 0,
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      })
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || value === null || value === undefined) {
      setFormData({ ...formData, amount: 0 })
      return
    }
    
    const parsedAmount = parseFloat(value)
    if (isNaN(parsedAmount)) {
      setFormData({ ...formData, amount: 0 })
    } else {
      setFormData({ ...formData, amount: parsedAmount })
    }
  }

  const getSafeAmountValue = () => {
    // Ensure we always return a valid number or empty string, never NaN
    if (formData.amount === null || formData.amount === undefined) {
      return '0'
    }
    
    if (isNaN(formData.amount)) {
      return '0'
    }
    
    return formData.amount.toString()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {isEditing ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          step="0.01"
          min="0.01"
          required
          value={getSafeAmountValue()}
          onChange={handleAmountChange}
          onBlur={() => {
            // Normalize the value when user leaves the field
            if (formData.amount < 0.01) {
              setFormData({ ...formData, amount: 0.01 })
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <input
          type="text"
          id="description"
          required
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
          placeholder="What did you spend money on?"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          id="category"
          required
          value={formData.category || ''}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <input
          type="date"
          id="date"
          required
          value={formData.date || ''}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        {isEditing ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  )
}