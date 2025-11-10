import { NextRequest, NextResponse } from 'next/server'

// Mock data storage for expense management
let mockExpenses: any[] = []

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { amount, description, category, date } = body

    console.log('PUT /api/expenses/${id} - Received data:', { id, body })

    if (!amount || amount <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Amount must be greater than 0'
      }, { status: 400 })
    }

    if (!description || description.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Description is required'
      }, { status: 400 })
    }

    if (!category || category.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Category is required'
      }, { status: 400 })
    }

    // Find and update the expense in mock data
    const expenseIndex = mockExpenses.findIndex(expense => expense.id === id)
    if (expenseIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Expense not found'
      }, { status: 404 })
    }

    const updatedExpense = {
      ...mockExpenses[expenseIndex],
      amount: parseFloat(amount.toString()),
      description: description.trim(),
      category: category.trim(),
      date: date ? new Date(date) : new Date(),
      updatedAt: new Date()
    }

    mockExpenses[expenseIndex] = updatedExpense

    console.log('PUT /api/expenses/${id} - Updated expense:', updatedExpense)

    return NextResponse.json({
      success: true,
      data: updatedExpense
    })
  } catch (error) {
    console.error('Error in PUT /api/expenses/[id]:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update expense',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    console.log('DELETE /api/expenses/${id} - Received ID:', id)

    // Find and remove the expense from mock data
    const expenseIndex = mockExpenses.findIndex(expense => expense.id === id)
    if (expenseIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Expense not found'
      }, { status: 404 })
    }

    mockExpenses.splice(expenseIndex, 1)

    console.log('DELETE /api/expenses/${id} - Deleted expense with ID:', id)

    return NextResponse.json({
      success: true,
      message: 'Expense deleted successfully'
    })
  } catch (error) {
    console.error('Error in DELETE /api/expenses/[id]:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete expense',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}