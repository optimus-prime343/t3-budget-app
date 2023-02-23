import { z } from 'zod'

export const BudgetSchema = z.object({
  title: z.string().min(1).max(100),
  maxSpending: z.number().min(0),
})
export type BudgetFormData = z.infer<typeof BudgetSchema>
