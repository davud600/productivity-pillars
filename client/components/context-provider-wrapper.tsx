'use client'

import React from 'react'
import {
  PillarsProvider,
  SkillPointsProvider,
} from '@/context/pillars-and-skills-ctx'
import { AuthProvider } from '@/context/auth-ctx'

export function ContextProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <PillarsProvider>
        <SkillPointsProvider>{children}</SkillPointsProvider>
      </PillarsProvider>
    </AuthProvider>
  )
}
