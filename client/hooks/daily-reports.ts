import { DailyReportsContext } from '@/context/daily-reports'
import { useContext } from 'react'

export function useDailyReports() {
  return useContext(DailyReportsContext)
}
