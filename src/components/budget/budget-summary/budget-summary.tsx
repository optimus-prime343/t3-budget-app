import {
  createStyles,
  Divider,
  Group,
  Progress,
  Stack,
  Title,
} from '@mantine/core'

import { SpendingRatio } from '~/components/common/spending-ratio'
import { api } from '~/utils/api'

export function BudgetSummary() {
  const { data: totalExpense = 0 } = api.expense.getTotalExpens.useQuery()
  const { data: totalBudget = 0 } = api.budget.getTotalBudget.useQuery()
  const { classes } = useStyles()

  const progress = (totalExpense / totalBudget) * 100
  const progressColor = progress >= 100 ? 'red' : undefined
  return (
    <Stack className={classes.container}>
      <Group align='center'>
        <Title order={4} sx={{ flex: 1 }}>
          Total
        </Title>
        <SpendingRatio
          currentSpending={totalExpense}
          maxSpending={totalBudget}
        />
      </Group>
      <Divider />
      <Progress color={progressColor} value={progress} />
    </Stack>
  )
}
const useStyles = createStyles(theme => ({
  container: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    borderRadius: theme.radius.xs,
    padding: theme.spacing.md,
    boxShadow: theme.shadows.sm,
  },
}))
