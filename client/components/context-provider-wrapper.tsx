'use client'

import React from 'react'
import {
  PillarsProvider,
  SkillPointsProvider,
} from '@/context/pillars-and-skills-ctx'

export function ContextProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PillarsProvider>
      <SkillPointsProvider>{children}</SkillPointsProvider>
    </PillarsProvider>
  )
}
