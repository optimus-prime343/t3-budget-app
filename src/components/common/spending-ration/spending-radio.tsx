import { Group, Text } from '@mantine/core'

import { formatCurrency } from '~/utils/format-currency'

export type SpendingRatioProps = {
  maxSpending: number
  currentSpending: number
}

export function SpendingRatio({
  maxSpending,
  currentSpending,
}: SpendingRatioProps) {
  const isOverBudget = currentSpending > maxSpending
  const color = isOverBudget ? 'red' : 'white'
  return (
    <Group align='baseline' spacing={4}>
      <Text color={color} fw='bold' size='lg'>
        {formatCurrency(currentSpending)}
      </Text>
      <Text>/</Text>
      <Text color='dimmed' size='xs'>
        {formatCurrency(maxSpending)}
      </Text>
    </Group>
  )
}
