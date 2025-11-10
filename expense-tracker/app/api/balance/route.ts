import { NextResponse } from 'next/server'

// Mock expenses data - in a real app, this would come from a database
let mockExpenses: any[] = []

export async function GET() {
  try {
    // Calculate balance statistics
    const totalExpenses = mockExpenses.length
    const totalAmount = mockExpenses.reduce((total, expense) => total + expense.amount, 0)
    
    return NextResponse.json({
      success: true,
      data: {
        balance: totalAmount,
        totalExpenses,
        totalAmount
      }
    })
  } catch (error) {
    console.error('Error calculating balance:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to calculate balance',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}