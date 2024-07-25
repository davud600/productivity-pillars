import { PillarData } from '.'
import { type CheckedPillar } from '../daily-reports'

export type PillarsContextData = {
  pillars: PillarData[]
  checkedPillars: CheckedPillar[]
  setCheckedPillars: React.Dispatch<React.SetStateAction<CheckedPillar[]>>
}
