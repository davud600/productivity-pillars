import { PillarsEnum, type PillarData } from '@/types/pillars'
import { SkillDifficultyEnum, SkillEnum } from '@/types/skills'

export const PILLARS: PillarData[] = [
  {
    title: PillarsEnum.Write,
    skillPoints: [
      {
        skill: SkillEnum.Creativity,
        points: 6,
      },
      {
        skill: SkillEnum.Expression,
        points: 4,
      },
      {
        skill: SkillEnum.Understanding,
        points: 2,
      },
    ],
    levels: [
      {
        title: 'Level 1',
        difficulty: SkillDifficultyEnum.Easy,
        description: '30 min',
      },
      {
        title: 'Level 2',
        difficulty: SkillDifficultyEnum.Medium,
        description: '45 min',
      },
      {
        title: 'Level 3',
        difficulty: SkillDifficultyEnum.Hard,
        description: '60 min',
      },
    ],
  },
  {
    title: PillarsEnum.Read,
    skillPoints: [
      {
        skill: SkillEnum.Understanding,
        points: 5,
      },
      {
        skill: SkillEnum.Expression,
        points: 3,
      },
      {
        skill: SkillEnum.Creativity,
        points: 3,
      },
      {
        skill: SkillEnum.Focus,
        points: 3,
      },
    ],
    levels: [
      {
        title: 'Level 1',
        difficulty: SkillDifficultyEnum.Easy,
        description: '5 pages',
      },
      {
        title: 'Level 2',
        difficulty: SkillDifficultyEnum.Medium,
        description: '10 pages',
      },
      {
        title: 'Level 3',
        difficulty: SkillDifficultyEnum.Hard,
        description: '20 pages',
      },
    ],
  },
  {
    title: PillarsEnum.Chess,
    skillPoints: [
      {
        skill: SkillEnum.Foresight,
        points: 6,
      },
      {
        skill: SkillEnum.Focus,
        points: 5,
      },
    ],
    levels: [
      {
        title: 'Level 1',
        difficulty: SkillDifficultyEnum.Easy,
        description: '1 game',
      },
      {
        title: 'Level 2',
        difficulty: SkillDifficultyEnum.Medium,
        description: '3 games',
      },
      {
        title: 'Level 3',
        difficulty: SkillDifficultyEnum.Hard,
        description: '5 games',
      },
    ],
  },
  {
    title: PillarsEnum.Exercise,
    skillPoints: [
      {
        skill: SkillEnum.Creativity,
        points: 1,
      },
      {
        skill: SkillEnum.Expression,
        points: 1,
      },
      {
        skill: SkillEnum.Focus,
        points: 3,
      },
      {
        skill: SkillEnum.Foresight,
        points: 1,
      },
      {
        skill: SkillEnum.Understanding,
        points: 1,
      },
    ],
    levels: [
      {
        title: 'Level 1',
        difficulty: SkillDifficultyEnum.Easy,
        description: 'One (lifting, running or stretching)',
      },
      {
        title: 'Level 2',
        difficulty: SkillDifficultyEnum.Medium,
        description: 'Two (lifting, running or stretching)',
      },
      {
        title: 'Level 3',
        difficulty: SkillDifficultyEnum.Hard,
        description: 'Three (lifting, running or stretching)',
      },
    ],
  },
]
