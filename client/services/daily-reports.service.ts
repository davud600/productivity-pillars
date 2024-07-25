import {
  type DailyReport,
  type PublicDailyReportData,
} from '@/types/daily-reports'

export const DailyReportsService = {
  all: async (token: string): Promise<DailyReport[]> => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/daily-reports`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!result.ok) throw new Error(result.statusText)

    return (await result.json()).data
  },

  get: async (token: string, day: string): Promise<DailyReport> => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/daily-reports/${day}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!result.ok) throw new Error(result.statusText)

    return (await result.json()).data
  },

  createOrUpdate: async (
    token: string,
    dailyReportData: PublicDailyReportData
  ): Promise<void> => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/daily-reports`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: dailyReportData }),
      }
    )

    if (!result.ok) throw new Error(result.statusText)
  },
}
