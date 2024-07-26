import { DailyReportContext } from '@/context/daily-report'
import { useContext } from 'react'

export function useDailyReport() {
  return useContext(DailyReportContext)
}
