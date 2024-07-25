export enum SkillEnum {
  Foresight = 'Foresight',
  Creativity = 'Creativity',
  Expression = 'Expression',
  Understanding = 'Understanding',
  Focus = 'Focus',
}

export enum SkillDifficultyEnum { // rename to PillarDifficultyEnum and move to pillars types
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export type SkillPoint = {
  skill: SkillEnum
  points: number
}

export type SkillPointsContextData = {
  skillPoints: SkillPoint[]
  addPointsOfSkill: (skill: SkillEnum, points: number) => void
}
