import { MantineProvider, type MantineProviderProps } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { api } from '~/utils/api'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const mantineTheme: MantineProviderProps['theme'] = {
    colorScheme: 'dark',
    primaryColor: 'indigo',
  }
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position='top-center'>
          <ModalsProvider modalProps={{ centered: true }}>
            <Component {...pageProps} />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
