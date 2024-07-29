'use client'

import { AuthProvider } from '@/context/auth-ctx'
import { DailyReportsProvider } from '@/context/daily-reports'

export function AuthProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}

export function DailyReportsProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <DailyReportsProvider>{children}</DailyReportsProvider>
}
