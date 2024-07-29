import { type DailyReport, type CheckedPillar } from '.'
import { type SkillPoint } from '../skills'

export type DailyReportsContextData = {
  fetchedDailyReportsData: boolean
  checkedPillars: CheckedPillar[]
  setCheckedPillars: React.Dispatch<React.SetStateAction<CheckedPillar[]>>
  skillPoints: SkillPoint[]
  dailyReportsData: DailyReport[]
  updatingDailyReportsData: boolean
}
