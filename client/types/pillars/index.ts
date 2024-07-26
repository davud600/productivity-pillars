import { type SkillEnum } from '../skills'

export enum PillarsEnum {
  Write = 'Write',
  Read = 'Read',
  Chess = 'Chess',
  Exercise = 'Exercise',
}

export enum PillarDifficultyEnum {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export type PillarData = {
  title: PillarsEnum
  skillPoints: {
    skill: SkillEnum
    points: number
  }[]
  levels: {
    title: string
    difficulty: number
    description: string
  }[]
}
