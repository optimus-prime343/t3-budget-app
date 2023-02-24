import { Stack } from '@mantine/core'
import { type Expense } from '@prisma/client'

import { ExpenseItem } from '~/components/expense/expense-item'

export type ExpenseListProps = {
  expenses: Expense[]
}
export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <Stack spacing='xs'>
      {expenses.map(expense => (
        <ExpenseItem expense={expense} key={expense.id} />
      ))}
    </Stack>
  )
}
