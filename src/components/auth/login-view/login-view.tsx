import { Center } from '@mantine/core'

import { GoogleLoginButton } from '~/components/auth/google-login-button'

export function LoginView() {
  return (
    <Center mih='100vh'>
      <GoogleLoginButton />
    </Center>
  )
}
