import { ActionIcon, Badge, Box, createStyles, Flex, Text } from '@mantine/core'
import { type Expense } from '@prisma/client'
import { IconTrash } from '@tabler/icons-react'

import { formatCurrency } from '~/utils/format-currency'

export type ExpenseItemProps = {
  expense: Expense
}
export function ExpenseItem({ expense }: ExpenseItemProps) {
  const { classes } = useStyles()
  return (
    <Box className={classes.expenseItem} key={expense.id}>
      <Badge sx={{ alignSelf: 'flex-start' }}>
        {formatCurrency(expense.amount)}
      </Badge>
      <Flex justify='space-between'>
        <Text>{expense.title}</Text>
        <ActionIcon variant='filled'>
          <IconTrash />
        </ActionIcon>
      </Flex>
    </Box>
  )
}
const useStyles = createStyles(theme => ({
  expenseItem: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingInline: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
    borderRadius: theme.radius.xs,
  },
}))
