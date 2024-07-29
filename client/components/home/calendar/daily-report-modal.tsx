import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PILLARS, SKILL_MAX_POINTS } from '@/constants/pillars'
import { useAuth } from '@/hooks/auth'
import { DailyReportsService } from '@/services/daily-reports.service'
import {
  type CheckedPillar,
  type PublicDailyReportData,
} from '@/types/daily-reports'
import { PillarDifficultyEnum } from '@/types/pillars'
import { SkillEnum, type SkillPoint } from '@/types/skills'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Pillar, SKILL_COLORS } from '.'
import { DailyReportPillar } from '../daily-report/pillar'
import { DailyReportSkill } from '../daily-report/skill'

interface DailyReportModalProps {
  dailyReportData: PublicDailyReportData
}

export function DailyReportModal({ dailyReportData }: DailyReportModalProps) {
  const { token } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [checkedPillars, setCheckedPillars] = useState<CheckedPillar[]>(
    dailyReportData.checkedPillars
  )
  const [skillPoints, setSkillPoints] = useState<SkillPoint[]>(
    dailyReportData.skillPoints
  )
  const [updatingDailyReportsData, setUpdatingDailyReportsData] =
    useState(false)

  const updateSkillPoints = () => {
    setSkillPoints((prevSkillPoints) => {
      return prevSkillPoints.map((prevSkillPoint) => {
        const points = checkedPillars
          .map((checkedPillar) => {
            const points =
              (PILLARS.find(
                (pillar) => pillar.title === checkedPillar.pillar
              )?.skillPoints.find(
                (skillPoint) => skillPoint.skill === prevSkillPoint.skill
              )?.points || 0) +
              (PILLARS.find(
                (pillar) =>
                  pillar.skillPoints
                    .map((skillPoint) => skillPoint.skill)
                    .includes(prevSkillPoint.skill) &&
                  pillar.title === checkedPillar.pillar
              )
                ? checkedPillar.level
                : 0)
            return points
          })
          .reduce((a, b) => a + b, 0)
        return { ...prevSkillPoint, points }
      })
    })
  }

  useEffect(() => {
    updateSkillPoints()
  }, [checkedPillars])

  useEffect(() => {
    if (!isOpen || updatingDailyReportsData) return
    setUpdatingDailyReportsData(true)

    const createOrUpdateDailyReportRes = DailyReportsService.createOrUpdate(
      token,
      {
        day: format(dailyReportData.day, 'yyyy-MM-dd'),
        skillPoints,
        checkedPillars,
      }
    )

    toast.promise(createOrUpdateDailyReportRes, {
      loading: 'Loading...',
      success: () => {
        setTimeout(() => setUpdatingDailyReportsData(false), 1000)
        return (
          <span className="text-green-400 font-medium">
            Updated daily report
          </span>
        )
      },
      error: (error) => {
        setUpdatingDailyReportsData(false)
        return (
          <span className="text-red-400 font-medium">
            {error.toString() || 'Error'}
          </span>
        )
      },
    })
  }, [skillPoints, checkedPillars])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="cursor-pointer hover:bg-[rgb(20,20,20)] transition-all text-center border-0 border-header-border p-2 flex flex-col items-center bg-[rgb(13,13,13)]">
          <div
            style={{
              color:
                format(dailyReportData.day, 'yyyy-MM-dd') ===
                format(new Date(), 'yyyy-MM-dd')
                  ? 'rgb(239 68 68)'
                  : 'rgb(229 229 229)',
            }}
          >
            {format(dailyReportData.day, 'd')}
          </div>
          <div className="flex justify-between mt-2 w-full h-16">
            {(skillPoints || []).map((skillPoint, i) => (
              <Pillar
                key={i}
                percentage={
                  (skillPoint.points / SKILL_MAX_POINTS[skillPoint.skill]) * 100
                }
                color={SKILL_COLORS[skillPoint.skill]}
              />
            ))}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl flex flex-col gap-10 border-header-border border rounded-lg w-full items-center py-10 md:px-10 px-4 bg-[rgb(13,13,13)] shadow-xl">
          <DialogHeader>
            <DialogTitle className="w-full flex items-center justify-center gap-4">
              <Calendar className="md:w-8 md:h-8 w-6 h-6" />
              <h1 className="linear-wipe animate-scroll-text font-normal text-lg md:font-[500] md:text-2xl text-center tracking-wide !leading-[1.25] md:!leading-[4rem]">
                Daily report {dailyReportData.day}
              </h1>
            </DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col gap-8">
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
                  day={dailyReportData.day}
                  updatingDailyReportsData={updatingDailyReportsData}
                />
              ))}
            </div>
            <div className="flex items-center justify-between w-full">
              {Object.keys(SkillEnum).map((skill) => (
                <DailyReportSkill
                  key={skill}
                  skill={skill as SkillEnum}
                  points={
                    skillPoints.find((skillPoint) => skillPoint.skill === skill)
                      ?.points || 0
                  }
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
