export enum SkillEnum {
  Foresight = 'Foresight',
  Creativity = 'Creativity',
  Expression = 'Expression',
  Understanding = 'Understanding',
  Focus = 'Focus',
}

export type SkillPoint = {
  skill: SkillEnum
  points: number
}

export type SkillPointsContextData = {
  skillPoints: SkillPoint[]
  addPointsOfSkill: (skill: SkillEnum, points: number) => void
}
