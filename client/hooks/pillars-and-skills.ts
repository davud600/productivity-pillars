import {
  PillarsContext,
  SkillPointsContext,
} from '@/context/pillars-and-skills-ctx'
import { PillarsEnum } from '@/types/pillars'
import { SkillEnum } from '@/types/skills'
import { useContext } from 'react'

export function usePillars() {
  return useContext(PillarsContext)
}

export function usePillar(pillarTitle: PillarsEnum) {
  const { pillars } = useContext(PillarsContext)
  return pillars.find((pillar) => pillar.title === pillarTitle)
}

export function useSkillPoints() {
  return useContext(SkillPointsContext)
}

export function useSkillPoint(skill: SkillEnum) {
  const { skillPoints } = useContext(SkillPointsContext)
  return skillPoints.find((skillPoint) => skillPoint.skill === skill)?.points
}
