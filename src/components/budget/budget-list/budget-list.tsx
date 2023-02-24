import { Grid } from '@mantine/core'
import { type Budget } from '@prisma/client'

import { BudgetItem } from '../budget-item'

export type BudgetListProps = {
  budgets: Budget[]
}
export function BudgetList({ budgets }: BudgetListProps) {
  return (
    <Grid>
      {budgets.map(budget => (
        <Grid.Col key={budget.id} lg={3} md={6} sm={12}>
          <BudgetItem budget={budget} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
