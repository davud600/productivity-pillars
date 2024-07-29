import { PILLARS } from '@/constants/pillars'
import { useDailyReports } from '@/hooks/daily-reports'
import { PillarDifficultyEnum } from '@/types/pillars'
import { format } from 'date-fns'
import { DailyReportPillar } from './pillar'

export function DailyReportPillars() {
  const { checkedPillars, setCheckedPillars, updatingDailyReportsData } =
    useDailyReports()

  return (
    <div className="flex flex-col gap-5 items-start w-full">
      {PILLARS.map((pillar) => (
        <DailyReportPillar
          key={pillar.title}
          pillar={pillar}
          initiallyChecked={
            !!checkedPillars.find(
              (checkedPillar) => checkedPillar.pillar === pillar.title
            )
          }
          initialLevel={
            checkedPillars.find(
              (checkedPillar) => checkedPillar.pillar === pillar.title
            )?.level || PillarDifficultyEnum.Easy
          }
          setCheckedPillars={setCheckedPillars}
          day={format(new Date(), 'yyyy-MM-dd')}
          updatingDailyReportsData={updatingDailyReportsData}
        />
      ))}
    </div>
  )
}
