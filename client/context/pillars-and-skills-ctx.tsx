import { PILLARS } from '@/constants/pillars'
import { DailyReportsService } from '@/services/daily-reports.service'
import { type PillarsContextData } from '@/types/pillars/context'
import {
  SkillEnum,
  SkillPoint,
  type SkillPointsContextData,
} from '@/types/skills'
import Cookies from 'js-cookie'
import { type ReactNode, createContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

// Pillars
const initialPillarsContextData = {
  pillars: [],
}

export const PillarsContext = createContext<PillarsContextData>(
  initialPillarsContextData
)

export function PillarsProvider({ children }: { children: ReactNode }) {
  const pillars = PILLARS

  const value = {
    pillars,
  }

  return (
    <PillarsContext.Provider value={value}>{children}</PillarsContext.Provider>
  )
}

// Skill Points
const initialSkillPoints: SkillPoint[] = Object.keys(SkillEnum).map(
  (skill) => ({
    skill: skill as SkillEnum,
    points: 0,
  })
)

const initialSkillPointsContextData = {
  skillPoints: initialSkillPoints,
  addPointsOfSkill: (skill: SkillEnum, points: number) => false,
}

export const SkillPointsContext = createContext<SkillPointsContextData>(
  initialSkillPointsContextData
)

export function SkillPointsProvider({ children }: { children: ReactNode }) {
  const [skillPoints, setSkillPoints] =
    useState<SkillPoint[]>(initialSkillPoints)
  const token = Cookies.get('token')

  const addPointsOfSkill = (skill: SkillEnum, points: number) => {
    setSkillPoints((prevSkillPoints) => {
      return prevSkillPoints.map((skillPoint) =>
        skillPoint.skill === skill
          ? {
              ...skillPoint,
              points: skillPoint.points + points,
            }
          : skillPoint
      )
    })
  }

  useEffect(() => {
    const createOrUpdateDailyReportRes = DailyReportsService.createOrUpdate(
      token || '',
      {
        day: new Date().toISOString().split('T')[0],
        skillPoints,
      }
    )

    toast.promise(createOrUpdateDailyReportRes, {
      loading: 'Loading...',
      success: (data) => {
        return (
          <span className="text-green-600 font-medium">
            Updated daily report
          </span>
        )
      },
      error: (error) => {
        return (
          <span className="text-red-600 font-medium">
            {error.toString() || 'Error'}
          </span>
        )
      },
    })
  }, [skillPoints])

  const value = {
    skillPoints,
    addPointsOfSkill,
  }

  return (
    <SkillPointsContext.Provider value={value}>
      {children}
    </SkillPointsContext.Provider>
  )
}
