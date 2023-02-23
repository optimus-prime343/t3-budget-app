import { LoadingOverlay } from '@mantine/core'
import { useSession } from 'next-auth/react'

import { LoginView } from '~/components/auth/login-view'

export default function HomePage() {
  const { data: session, status } = useSession()
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
    <div>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </div>
  )
}
