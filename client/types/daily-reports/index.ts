import { CommonDatabaseFields } from '..'
import { PillarsEnum } from '../pillars'
import { SkillDifficultyEnum, SkillPoint } from '../skills'

export type CheckedPillar = {
  pillar: PillarsEnum
  level: SkillDifficultyEnum
}

export type DailyReportData = {
  skillPoints: SkillPoint[]
  checkedPillars: CheckedPillar[]
  day: string // yyyy-mm-dd
  userId: number
}

export type PublicDailyReportData = Omit<DailyReportData, 'userId'>

export type DailyReport = DailyReportData & CommonDatabaseFields
