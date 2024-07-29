import { Icons } from '@/components/icons'
import { useDailyReports } from '@/hooks/daily-reports'
import { DailyReportPillars } from './pillars'
import { DailyReportSkills } from './skills'

export function CardContent() {
  const { fetchedDailyReportsData } = useDailyReports()

  return (
    <>
      {!!fetchedDailyReportsData ? (
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
