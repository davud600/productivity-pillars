import { type SkillEnum } from '../skills'

export enum PillarsEnum {
  Write = 'Write',
  Read = 'Read',
  Chess = 'Chess',
  Exercise = 'Exercise',
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
