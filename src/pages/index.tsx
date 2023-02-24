import { Box, Flex, LoadingOverlay } from '@mantine/core'
import { useSession } from 'next-auth/react'

import { LoginView } from '~/components/auth/login-view'
import { BudgetList } from '~/components/budget/budget-list'
import { BudgetSummary } from '~/components/budget/budget-summary'
import { Navbar } from '~/components/layouts/navbar'
import { api } from '~/utils/api'

export default function HomePage() {
  const { data: budgets = [] } = api.budget.read.useQuery()
  const { status } = useSession()
  if (status === 'loading') {
    return (
      <LoadingOverlay
        overlayBlur={2}
        sx={{ position: 'fixed', inset: 0 }}
        visible
      />
    )
  }
  if (status === 'unauthenticated') return <LoginView />
  return (
    <>
      <Navbar />
      <Flex
        direction={{ base: 'column-reverse', sm: 'row' }}
        gap='md'
        px='md'
        py='xs'
      >
        <BudgetList budgets={budgets} />
        <Box miw={{ base: '100%', sm: '25rem' }}>
          <BudgetSummary />
        </Box>
      </Flex>
    </>
  )
}
