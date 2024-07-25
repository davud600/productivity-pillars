'use client'

import { usePillars } from '@/hooks/pillars-and-skills'
import { DailyReportPillar } from './daily-report-pillar'
import { type DailyReport } from '@/types/daily-reports'

export function DailyReportPillars() {
  const { pillars } = usePillars()

  return (
    <>
      {pillars.map((pillar) => (
        <DailyReportPillar key={pillar.title} pillarTitle={pillar.title} />
      ))}
    </>
  )
}
