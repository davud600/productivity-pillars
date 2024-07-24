import { ContextProviderWrapper } from '@/components/context-provider-wrapper'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Productivity pillars',
  description: 'Essential hobbies reports - analysis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-neutral-950')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProviderWrapper>{children}</ContextProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
