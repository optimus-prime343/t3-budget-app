import { Divider, Stack } from '@mantine/core'
import { type Expense } from '@prisma/client'

import { ExpenseItem } from '~/components/expense/expense-item'

export type ExpenseListProps = {
  expenses: Expense[]
}
export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <Stack spacing={0}>
      {expenses.map((expense, index) => (
        <>
          <Divider display={index === 0 ? 'none' : 'block'} my='md' />
          <ExpenseItem expense={expense} key={expense.id} />
        </>
      ))}
    </Stack>
  )
}
