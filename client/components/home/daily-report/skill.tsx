'use client'

import { cn } from '@/lib/utils'
import { SkillEnum } from '@/types/skills'
import { useEffect, useState } from 'react'

interface DailyReportSkillProps {
  skill: SkillEnum
  points: number
}

export function DailyReportSkill({ skill, points }: DailyReportSkillProps) {
  const [displayPoints, setDisplayPoints] = useState(points)
  const [previousPoints, setPreviousPoints] = useState(points)

  useEffect(() => {
    const increment = points > previousPoints ? 1 : -1
    const interval = setInterval(() => {
      setDisplayPoints((prev) => {
        if (prev === points) {
          clearInterval(interval)
          return prev
        }
        return prev + increment
      })
    }, 100)

    setPreviousPoints(points)

    return () => clearInterval(interval)
  }, [points])

  let statusColor = 'text-red-400'
  if (displayPoints >= 4) statusColor = 'text-yellow-400'
  if (displayPoints >= 9) statusColor = 'text-green-400'

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <span className="text-neutral-400 text-xs md:text-base text-center">
        {skill}
      </span>
      <span
        className={cn(
          'text-xs md:text-base text-center font-semibold',
          statusColor
        )}
      >
        <>+{displayPoints || 0} Points</>
      </span>
    </div>
  )
}
