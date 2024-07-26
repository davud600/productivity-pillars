import { type CheckedPillar } from '.'
import { type SkillPoint } from '../skills'

export type DailyReportContextData = {
  fetchedDailyReportData: boolean
  checkedPillars: CheckedPillar[]
  setCheckedPillars: React.Dispatch<React.SetStateAction<CheckedPillar[]>>
  skillPoints: SkillPoint[]
}
