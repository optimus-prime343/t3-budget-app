import { ActionIcon, Badge, Box, Flex, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { type Expense } from '@prisma/client'
import { IconTrash } from '@tabler/icons-react'

import { api } from '~/utils/api'
import { formatCurrency } from '~/utils/format-currency'

export type ExpenseItemProps = {
  expense: Expense
}
export function ExpenseItem({ expense }: ExpenseItemProps) {
  const utils = api.useContext()
  const deleteExpense = api.expense.delete.useMutation()

  const handleDeleteExpense = () => {
    deleteExpense.mutate(
      { expenseId: expense.id },
      {
        onSuccess: async () => {
          await utils.expense.read.invalidate({ budgetId: expense.budgetId })
        },
        onError: error => {
          showNotification({
            title: 'Error',
            message: error.message,
            color: 'red',
          })
        },
      }
    )
  }
  if (deleteExpense.isSuccess) return null
  return (
    <Box>
      <Badge sx={{ alignSelf: 'flex-start' }}>
        {formatCurrency(expense.amount)}
      </Badge>
      <Flex justify='space-between'>
        <Text>{expense.title}</Text>
        <ActionIcon
          loading={deleteExpense.isLoading}
          onClick={handleDeleteExpense}
          variant='filled'
        >
          <IconTrash />
        </ActionIcon>
      </Flex>
    </Box>
  )
}
