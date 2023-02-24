import { z } from 'zod'

export const ExpenseSchema = z.object({
  title: z.string().min(1),
  amount: z.number(),
  budgetId: z.string().min(1),
})
export type ExpenseFormData = z.infer<typeof ExpenseSchema>
