import { Icons } from '@/components/icons'
import { useDailyReport } from '@/hooks/daily-report'
import { DailyReportPillars } from './pillars'
import { DailyReportSkills } from './skills'

export function CardContent() {
  const { fetchedDailyReportData } = useDailyReport()

  return (
    <>
      {fetchedDailyReportData ? (
        <>
          <DailyReportPillars />
          <DailyReportSkills />
        </>
      ) : (
        <Icons.spinner className="mr-2 md:h-10 h-8 md:w-10 w-8 animate-spin" />
      )}
    </>
  )
}
