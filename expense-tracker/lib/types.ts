export interface Expense {
  id: string
  amount: number
  description: string
  category: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface ExpenseFormData {
  amount: number
  description: string
  category: string
  date: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}