import { ContextProviderWrapper } from '@/components/context-provider-wrapper'
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
  return <ContextProviderWrapper>{children}</ContextProviderWrapper>
}
