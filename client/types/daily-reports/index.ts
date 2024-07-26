import { CommonDatabaseFields } from '..'
import { PillarDifficultyEnum, PillarsEnum } from '../pillars'
import { SkillPoint } from '../skills'

export type CheckedPillar = {
  pillar: PillarsEnum
  level: PillarDifficultyEnum
}

export type DailyReportData = {
  skillPoints: SkillPoint[]
  checkedPillars: CheckedPillar[]
  day: string // yyyy-mm-dd
  userId: number
}

export type PublicDailyReportData = Omit<DailyReportData, 'userId'>

export type DailyReport = DailyReportData & CommonDatabaseFields
