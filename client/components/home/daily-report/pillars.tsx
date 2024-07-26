import { Icons } from '@/components/icons'
import { PILLARS } from '@/constants/pillars'
import { useDailyReport } from '@/hooks/daily-report'
import { PillarDifficultyEnum } from '@/types/pillars'
import { DailyReportPillar } from './pillar'

export function DailyReportPillars() {
  const { checkedPillars } = useDailyReport()

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
        />
      ))}
    </div>
  )
}
