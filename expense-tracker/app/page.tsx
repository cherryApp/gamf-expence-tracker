'use client'

import { useState, useEffect } from 'react'
import ExpenseForm from '@/components/ExpenseForm'
import ExpenseList from '@/components/ExpenseList'
import BalanceDisplay from '@/components/BalanceDisplay'
import DarkModeToggle from '@/components/DarkModeToggle'
import { Expense, ExpenseFormData } from '@/lib/types'

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/expenses')
      const data = await response.json()
      
      if (data.success) {
        setExpenses(data.data)
      } else {
        setError(data.error || 'Failed to fetch expenses')
      }
    } catch (err) {
      setError('Failed to fetch expenses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleSubmit = async (formData: ExpenseFormData) => {
    try {
      if (editingExpense) {
        const response = await fetch(`/api/expenses/${editingExpense.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        const data = await response.json()
        if (data.success) {
          setEditingExpense(null)
          fetchExpenses()
        } else {
          setError(data.error || 'Failed to update expense')
        }
      } else {
        const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        const data = await response.json()
        if (data.success) {
          fetchExpenses()
        } else {
          setError(data.error || 'Failed to create expense')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return
    
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      if (data.success) {
        fetchExpenses()
      } else {
        setError(data.error || 'Failed to delete expense')
      }
    } catch (err) {
      setError('Failed to delete expense')
    }
  }

  const cancelEdit = () => {
    setEditingExpense(null)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading expenses...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <DarkModeToggle />
      
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Expense Tracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your expenses and manage your budget
          </p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <ExpenseForm 
              onSubmit={handleSubmit}
              initialData={editingExpense ? {
                amount: editingExpense.amount,
                description: editingExpense.description,
                category: editingExpense.category,
                date: editingExpense.date.toISOString().split('T')[0]
              } : undefined}
              isEditing={!!editingExpense}
            />
            {editingExpense && (
              <button
                onClick={cancelEdit}
                className="w-full rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel Edit
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            <BalanceDisplay expenses={expenses} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ExpenseList 
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  )
}