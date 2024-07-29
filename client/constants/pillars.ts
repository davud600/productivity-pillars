import {
  PillarDifficultyEnum,
  PillarsEnum,
  type PillarData,
} from '@/types/pillars'
import { SkillEnum, type SkillPoint } from '@/types/skills'

const calculateMaxSkillPoints = (
  pillars: PillarData[]
): { [key in SkillEnum]: number } => {
  const skillMaxPoints: { [key in SkillEnum]: number } = {
    [SkillEnum.Foresight]: 0,
    [SkillEnum.Creativity]: 0,
    [SkillEnum.Expression]: 0,
    [SkillEnum.Understanding]: 0,
    [SkillEnum.Focus]: 0,
  }

  pillars.forEach((pillar) => {
    pillar.skillPoints.forEach((skillPoint) => {
      skillMaxPoints[skillPoint.skill] += skillPoint.points
      skillMaxPoints[skillPoint.skill] += Math.max(
        ...pillar.levels.map((level) => level.difficulty)
      )
    })
  })

  return skillMaxPoints
}

export const PILLARS: PillarData[] = [
  {
    title: PillarsEnum.Write,
    skillPoints: [
      {
        skill: SkillEnum.Creativity,
        points: 5,
      },
      {
        skill: SkillEnum.Expression,
        points: 3,
      },
      {
        skill: SkillEnum.Understanding,
        points: 2,
      },
    ],
    levels: [
      {
        title: 'Level 1',
        difficulty: PillarDifficultyEnum.Easy,
        description: '30 min',
      },
      {
        title: 'Level 2',
        difficulty: PillarDifficultyEnum.Medium,
        description: '45 min',
      },
      {
        title: 'Level 3',
        difficulty: PillarDifficultyEnum.Hard,
        description: '60 min',
      },
    ],
  },
  {
    title: PillarsEnum.Read,
    skillPoints: [
      {
        skill: SkillEnum.Understanding,
        points: 4,
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
        points: 2,
      },
    ],
    levels: [
      {
        title: 'Level 1',
        difficulty: PillarDifficultyEnum.Easy,
        description: '5 pages',
      },
      {
        title: 'Level 2',
        difficulty: PillarDifficultyEnum.Medium,
        description: '10 pages',
      },
      {
        title: 'Level 3',
        difficulty: PillarDifficultyEnum.Hard,
        description: '20 pages',
      },
    ],
  },
  {
    title: PillarsEnum.Chess,
    skillPoints: [
      {
        skill: SkillEnum.Foresight,
        points: 5,
      },
      {
        skill: SkillEnum.Focus,
        points: 5,
      },
    ],
    levels: [
      {
        title: 'Level 1',
        difficulty: PillarDifficultyEnum.Easy,
        description: '1 game',
      },
      {
        title: 'Level 2',
        difficulty: PillarDifficultyEnum.Medium,
        description: '3 games',
      },
      {
        title: 'Level 3',
        difficulty: PillarDifficultyEnum.Hard,
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
        difficulty: PillarDifficultyEnum.Easy,
        description: 'One (lifting, running or stretching)',
      },
      {
        title: 'Level 2',
        difficulty: PillarDifficultyEnum.Medium,
        description: 'Two (lifting, running or stretching)',
      },
      {
        title: 'Level 3',
        difficulty: PillarDifficultyEnum.Hard,
        description: 'Three (lifting, running or stretching)',
      },
    ],
  },
]

export const SKILL_MAX_POINTS = calculateMaxSkillPoints(PILLARS)

export const INITIAL_SKILL_POINTS: SkillPoint[] = Object.keys(SkillEnum).map(
  (skill) => ({
    skill: skill as SkillEnum,
    points: 0,
  })
)
