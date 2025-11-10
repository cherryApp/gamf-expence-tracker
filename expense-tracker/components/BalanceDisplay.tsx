'use client'

import { useEffect, useState } from 'react'

interface BalanceDisplayProps {
  expenses: any[]
}

export default function BalanceDisplay({ expenses }: BalanceDisplayProps) {
  const [balance, setBalance] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
      setTotalExpenses(total)
      setBalance(total)
    } else {
      setBalance(0)
      setTotalExpenses(0)
    }
  }, [expenses])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-lg font-medium mb-2">Total Expenses</h2>
      <p className="text-3xl font-bold">{formatAmount(balance)}</p>
      <p className="text-blue-100 text-sm mt-1">
        {expenses.length} expense{expenses.length !== 1 ? 's' : ''} recorded
      </p>
    </div>
  )
}