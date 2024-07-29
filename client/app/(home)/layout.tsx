import {
  AuthProviderWrapper,
  DailyReportsProviderWrapper,
} from '@/context/provider-wrappers'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Productivity pillars',
  description: 'Essential hobbies reports - analysis',
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <AuthProviderWrapper>
        <DailyReportsProviderWrapper>{children}</DailyReportsProviderWrapper>
      </AuthProviderWrapper>
    </>
  )
}
