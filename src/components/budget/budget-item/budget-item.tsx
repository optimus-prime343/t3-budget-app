import {
  Box,
  Button,
  createStyles,
  Group,
  Progress,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { openModal } from '@mantine/modals'
import { type Budget } from '@prisma/client'

import { ExpenseForm } from '~/components/expense/expense-form'
import { api } from '~/utils/api'
import { formatCurrency } from '~/utils/format-currency'

export type BudgetItemProps = {
  budget: Budget
}
export function BudgetItem({ budget }: BudgetItemProps) {
  const { data: expenses = [] } = api.expense.read.useQuery({
    budgetId: budget.id,
  })
  const { classes } = useStyles()

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0)
  const progress = (totalExpense / budget.maxSpending) * 100
  const progressColor = progress >= 100 ? 'red' : undefined

  const handleAddExpense = () => {
    openModal({
      title: 'Add Expense',
      children: <ExpenseForm budgetId={budget.id} />,
    })
  }
  return (
    <Stack className={classes.container}>
      <Box className={classes.expenseInfo}>
        <Title order={4}>{budget.title}</Title>
        <Text>
          <Text component='span'>{formatCurrency(totalExpense)}</Text>
          <Text component='span'> / </Text>
          <Text component='span'>{formatCurrency(budget.maxSpending)}</Text>
        </Text>
      </Box>
      <Progress color={progressColor} value={progress} />
      <Group spacing='xs'>
        <Button onClick={handleAddExpense}>Add Expense</Button>
        <Button variant='outline'>View Expenses</Button>
      </Group>
    </Stack>
  )
}
const useStyles = createStyles(theme => ({
  container: {
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    borderRadius: '4px',
    boxShadow: theme.shadows.xs,
  },
  expenseInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
