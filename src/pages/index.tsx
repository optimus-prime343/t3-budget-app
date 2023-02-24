import { Box, LoadingOverlay } from '@mantine/core'
import { useSession } from 'next-auth/react'

import { LoginView } from '~/components/auth/login-view'
import { BudgetList } from '~/components/budget/budget-list'
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
      <Box px='md' py='xs'>
        <BudgetList budgets={budgets} />
      </Box>
    </>
  )
}
