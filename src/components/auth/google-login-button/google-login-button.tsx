import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconBrandGoogle } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'

export function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { redirect: false })
    } catch (error) {
      if (error instanceof Error) {
        showNotification({
          title: 'Error',
          message: error.message,
          color: 'red',
        })
      }
    }
  }
  return (
    <Button
      leftIcon={<IconBrandGoogle />}
      onClick={handleGoogleLogin}
      variant='light'
    >
      Login with Google
    </Button>
  )
}
