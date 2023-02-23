import { LoadingOverlay } from '@mantine/core'
import { useSession } from 'next-auth/react'

import { LoginView } from '~/components/auth/login-view'
import { Navbar } from '~/components/layouts/navbar'

export default function HomePage() {
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
    </>
  )
}
