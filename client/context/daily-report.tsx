import { PILLARS } from '@/constants/pillars'
import { useAuth } from '@/hooks/auth'
import { DailyReportsService } from '@/services/daily-reports.service'
import { type CheckedPillar } from '@/types/daily-reports'
import { type DailyReportContextData } from '@/types/daily-reports/context'
import { SkillEnum, SkillPoint } from '@/types/skills'
import { type ReactNode, createContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

// Daily Reports data
const initialSkillPoints: SkillPoint[] = Object.keys(SkillEnum).map(
  (skill) => ({
    skill: skill as SkillEnum,
    points: 0,
  })
)
const initialDailyReportContextData = {
  fetchedDailyReportData: false,
  checkedPillars: [],
  skillPoints: initialSkillPoints,
  setCheckedPillars: () => false,
}

export const DailyReportContext = createContext<DailyReportContextData>(
  initialDailyReportContextData
)

export function DailyReportProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  const [checkedPillars, setCheckedPillars] = useState<CheckedPillar[]>([])
  const [skillPoints, setSkillPoints] =
    useState<SkillPoint[]>(initialSkillPoints)
  const [fetchedDailyReportData, setFetchedDailyReportData] = useState(false)

  useEffect(() => {
    console.log('fetching')
    const fetchDailyReportData = async () => {
      const dailyReportData = await DailyReportsService.get(
        token,
        new Date().toISOString().split('T')[0]
      )
      setCheckedPillars(dailyReportData.checkedPillars)
      setFetchedDailyReportData(true)
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
              )?.points || 0) + checkedPillar.level

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
    if (!fetchedDailyReportData) return

    const createOrUpdateDailyReportRes = DailyReportsService.createOrUpdate(
      token,
      {
        day: new Date().toISOString().split('T')[0],
        skillPoints,
        checkedPillars,
      }
    )

    toast.promise(createOrUpdateDailyReportRes, {
      loading: 'Loading...',
      success: () => {
        return (
          <span className="text-green-400 font-medium">
            Updated daily report
          </span>
        )
      },
      error: (error) => {
        return (
          <span className="text-red-400 font-medium">
            {error.toString() || 'Error'}
          </span>
        )
      },
    })
  }, [skillPoints, checkedPillars])

  const value = {
    fetchedDailyReportData,
    checkedPillars,
    setCheckedPillars,
    skillPoints,
  }

  return (
    <DailyReportContext.Provider value={value}>
      {children}
    </DailyReportContext.Provider>
  )
}
