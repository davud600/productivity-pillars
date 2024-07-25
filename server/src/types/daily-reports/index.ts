import { CommonDatabaseFields } from '..'
import { SkillPoint } from '../skills'

export type DailyReportData = {
  skillPoints: SkillPoint[]
  day: string // yyyy-mm-dd
  userId: number
}

export type PublicDailyReportData = Omit<DailyReportData, 'userId'>

export type DailyReport = DailyReportData & CommonDatabaseFields
