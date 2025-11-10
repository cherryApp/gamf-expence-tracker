import { NextRequest, NextResponse } from 'next/server'

// ============================================================================
// TEMPORARY FIX: Mock Data Implementation
// ============================================================================
// 📝 This is a temporary implementation to bypass npm dependency issues.
// 📋 The original Prisma-based code is preserved and commented below.
// 🔧 When npm permissions are fixed, run: npm install && npx prisma generate
// ============================================================================

interface MockExpense {
  id: string
  amount: number
  description: string
  category: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

// Mock data storage to simulate database behavior
let mockExpenses: MockExpense[] = [
  {
    id: '1',
    amount: 25.50,
    description: 'Coffee and breakfast',
    category: 'Food',
    date: new Date('2024-11-01'),
    createdAt: new Date('2024-11-01T10:30:00Z'),
    updatedAt: new Date('2024-11-01T10:30:00Z')
  },
  {
    id: '2',
    amount: 45.00,
    description: 'Gas fill up',
    category: 'Transportation',
    date: new Date('2024-11-02'),
    createdAt: new Date('2024-11-02T15:45:00Z'),
    updatedAt: new Date('2024-11-02T15:45:00Z')
  }
]

export async function GET() {
  try {
    console.log('🚀 GET /api/expenses - Fetching expenses...')
    
    // Sort expenses by date descending
    const sortedExpenses = mockExpenses.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    console.log('✅ Successfully fetched', sortedExpenses.length, 'expenses')
    
    return NextResponse.json({
      success: true,
      data: sortedExpenses,
      meta: {
        total: sortedExpenses.length,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('❌ Error in GET /api/expenses:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch expenses',
      details: error instanceof Error ? error.message : 'Unknown error',
      hint: 'This might be a mock data issue - check the server logs'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, description, category, date } = body

    console.log('🚀 POST /api/expenses - Creating expense:', body)

    // Input validation
    if (!amount || amount <= 0 || isNaN(amount)) {
      return NextResponse.json({
        success: false,
        error: 'Amount must be greater than 0',
        received: amount
      }, { status: 400 })
    }

    if (!description || description.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Description is required',
        received: description
      }, { status: 400 })
    }

    if (!category || category.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Category is required',
        received: category
      }, { status: 400 })
    }

    const newExpense: MockExpense = {
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(amount.toString()),
      description: description.trim(),
      category: category.trim(),
      date: date ? new Date(date) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Add to mock data storage
    mockExpenses.push(newExpense)

    console.log('✅ Successfully created expense:', newExpense)

    return NextResponse.json({
      success: true,
      data: newExpense,
      message: 'Expense created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('❌ Error in POST /api/expenses:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create expense',
      details: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Check if request body is valid JSON and contains required fields'
    }, { status: 500 })
  }
}

/* ============================================================================
   ORIGINAL PRISMA IMPLEMENTATION (To be restored after npm fix):
   ============================================================================
   
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { ExpenseFormData } from '@/lib/types'

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' }
    })
    
    return NextResponse.json({
      success: true,
      data: expenses
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch expenses'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, description, category, date } = body as ExpenseFormData

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

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount.toString()),
        description: description.trim(),
        category: category.trim(),
        date: date ? new Date(date) : new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: expense
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create expense'
    }, { status: 500 })
  }
}

   ============================================================================ */