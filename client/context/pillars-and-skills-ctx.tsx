import { PILLARS } from '@/constants/pillars'
import { type PillarsContextData } from '@/types/pillars/context'
import {
  SkillEnum,
  SkillPoint,
  type SkillPointsContextData,
} from '@/types/skills'
import { type ReactNode, createContext, useState } from 'react'

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
const initialSkillPoints = Object.keys(SkillEnum).map((skill) => ({
  skill: skill as SkillEnum,
  points: 0,
}))

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
