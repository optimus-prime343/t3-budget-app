import {
  Box,
  Button,
  createStyles,
  Divider,
  Group,
  Progress,
  Stack,
  Title,
} from '@mantine/core'
import { openModal } from '@mantine/modals'
import { type Budget } from '@prisma/client'

import { SpendingRatio } from '~/components/common/spending-ratio/spending-ratio'
import { ExpenseForm } from '~/components/expense/expense-form'
import { ExpenseList } from '~/components/expense/expense-list'
import { api } from '~/utils/api'

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
  const hasExpenses = expenses.length > 0

  const handleAddExpense = () => {
    openModal({
      title: 'Add Expense',
      children: <ExpenseForm budgetId={budget.id} />,
    })
  }
  const handleViewExpenses = () => {
    openModal({
      centered: false,
      title: 'Expenses',
      children: <ExpenseList expenses={expenses} />,
    })
  }
  return (
    <Stack className={classes.container}>
      <Box className={classes.expenseInfo}>
        <Title order={4}>{budget.title}</Title>
        <SpendingRatio
          currentSpending={totalExpense}
          maxSpending={budget.maxSpending}
        />
      </Box>
      <Divider />
      <Progress color={progressColor} value={progress} />
      <Group spacing='xs'>
        <Button onClick={handleAddExpense}>Add Expense</Button>
        <Button
          disabled={!hasExpenses}
          onClick={handleViewExpenses}
          variant='outline'
        >
          View Expenses
        </Button>
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
