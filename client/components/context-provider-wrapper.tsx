'use client'

import React from 'react'
import { AuthProvider } from '@/context/auth-ctx'
import { DailyReportProvider } from '@/context/daily-report'

export function ContextProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
