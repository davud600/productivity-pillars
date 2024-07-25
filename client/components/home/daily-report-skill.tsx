'use client'

import { useSkillPoint } from '@/hooks/pillars-and-skills'
import { cn } from '@/lib/utils'
import { SkillEnum } from '@/types/skills'

interface DailyReportSkillProps {
  skill: SkillEnum
}

export function DailyReportSkill({ skill }: DailyReportSkillProps) {
  const points = useSkillPoint(skill)

  let statusColor = 'text-red-400'
  if ((points || 0) >= 4) statusColor = 'text-yellow-400'
  if ((points || 0) >= 9) statusColor = 'text-green-400'

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <span className="text-neutral-400 text-base text-center">{skill}</span>
      <span className={cn('text-base text-center font-semibold', statusColor)}>
        <>+{points || 0} Points</>
      </span>
    </div>
  )
}
