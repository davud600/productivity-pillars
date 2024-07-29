import { INITIAL_SKILL_POINTS, PILLARS } from '@/constants/pillars'
import { useAuth } from '@/hooks/auth'
import { DailyReportsService } from '@/services/daily-reports.service'
import { DailyReport, type CheckedPillar } from '@/types/daily-reports'
import { type DailyReportsContextData } from '@/types/daily-reports/context'
import { SkillEnum, SkillPoint } from '@/types/skills'
import { format } from 'date-fns'
import { type ReactNode, createContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

// Daily Reports data
const initialDailyReportsContextData = {
  fetchedDailyReportsData: false,
  checkedPillars: [],
  skillPoints: INITIAL_SKILL_POINTS,
  setCheckedPillars: () => false,
  dailyReportsData: [],
  updatingDailyReportsData: false,
}

export const DailyReportsContext = createContext<DailyReportsContextData>(
  initialDailyReportsContextData
)

export function DailyReportsProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  const [checkedPillars, setCheckedPillars] = useState<CheckedPillar[]>([])
  const [skillPoints, setSkillPoints] =
    useState<SkillPoint[]>(INITIAL_SKILL_POINTS)
  const [dailyReportsData, setDailyReportsData] = useState<DailyReport[]>([])
  const [updatingDailyReportsData, setUpdatingDailyReportsData] =
    useState(false)
  const [fetchedDailyReportsData, setFetchedDailyReportsData] = useState(false)

  useEffect(() => {
    const fetchDailyReportData = async () => {
      try {
        const dailyReportsData = await DailyReportsService.all(token)
        setDailyReportsData(dailyReportsData)

        const dailyReportData = dailyReportsData.find(
          (report) => report.day === format(new Date(), 'yyyy-MM-dd')
        )

        if (!!!dailyReportData) throw new Error()

        setCheckedPillars(dailyReportData.checkedPillars)
      } catch {
      } finally {
        setFetchedDailyReportsData(true)
      }
    }

    fetchDailyReportData()
  }, [])

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
    if (!fetchedDailyReportsData || updatingDailyReportsData) return
    setUpdatingDailyReportsData(true)

    const createOrUpdateDailyReportRes = DailyReportsService.createOrUpdate(
      token,
      {
        day: format(new Date(), 'yyyy-MM-dd'),
        skillPoints,
        checkedPillars,
      }
    )

    toast.promise(createOrUpdateDailyReportRes, {
      loading: 'Loading...',
      success: () => {
        setTimeout(() => setUpdatingDailyReportsData(false), 250)
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

  const value = {
    fetchedDailyReportsData,
    checkedPillars,
    setCheckedPillars,
    skillPoints,
    dailyReportsData,
    updatingDailyReportsData,
  }

  return (
    <DailyReportsContext.Provider value={value}>
      {children}
    </DailyReportsContext.Provider>
  )
}
