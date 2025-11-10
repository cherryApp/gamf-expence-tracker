'use client'

import { useEffect, useState } from 'react'

interface BalanceDisplayProps {
  expenses: any[]
}

export default function BalanceDisplay({ expenses }: BalanceDisplayProps) {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      // Filter out invalid amounts and ensure all values are numbers
      const validExpenses = expenses.filter(expense => {
        return expense && 
               typeof expense.amount === 'number' && 
               !isNaN(expense.amount) && 
               expense.amount >= 0
      })
      
      const total = validExpenses.reduce((sum, expense) => sum + expense.amount, 0)
      setBalance(total)
    } else {
      setBalance(0)
    }
  }, [expenses])

  const formatAmount = (amount: number) => {
    // Ensure we don't try to format NaN or invalid amount
    if (isNaN(amount) || amount === null || amount === undefined) {
      return '$0.00'
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const validExpenseCount = expenses?.filter(expense => 
    expense && !isNaN(expense.amount)
  ).length || 0

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-lg font-medium mb-2">Total Expenses</h2>
      <p className="text-3xl font-bold">{formatAmount(balance)}</p>
      <p className="text-blue-100 text-sm mt-1">
        {validExpenseCount} expense{validExpenseCount !== 1 ? 's' : ''} recorded
      </p>
    </div>
  )
}