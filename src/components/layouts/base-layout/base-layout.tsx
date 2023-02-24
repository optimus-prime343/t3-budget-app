import Head from 'next/head'

export type BaseLayoutProps = {
  title: string
  children: React.ReactNode
}
export function BaseLayout({ title, children }: BaseLayoutProps) {
  return (
    <>
      <Head>
        <meta
          content='Easily track your spending on various items.'
          name='description'
        />
        <meta
          content='budget tracker,money manager,react,nextjs,trpc,postgres'
          name='keywords'
        />
        <meta content='index, follow' name='robots' />
        <meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
        <meta content='English' name='language' />
        <title>T3 Budget Tracker - {title}</title>
      </Head>
      {children}
    </>
  )
}
