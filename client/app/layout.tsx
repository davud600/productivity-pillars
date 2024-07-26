import { ThemeProvider } from '@/components/theme-provider'
import { ibm_plex_sans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

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
      <body className={cn(ibm_plex_sans.className, 'bg-dark-background')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster theme="dark" />
      </body>
    </html>
  )
}
