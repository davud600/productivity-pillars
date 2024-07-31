import { PrismaClient } from '@prisma/client'
import { type DailyReportData, type DailyReport } from '../types/daily-reports'
import { DailyReportsDatabaseQueryErrorBase } from './daily-reports.errors'

const prisma = new PrismaClient()

export const DailyReportsService = {
  all: async (userId: number): Promise<DailyReport[]> => {
    try {
      const dailyReports = await prisma.dailyReport.findMany({
        where: { userId },
      })
      return dailyReports as DailyReport[]
    } catch (error) {
      throw new Error('Internal Server Error.')
    }
  },

  get: async (day: string, userId: number): Promise<DailyReport> => {
    try {
      const dailyReport = await prisma.dailyReport.findFirst({
        where: { day, userId },
      })

      if (!dailyReport) {
        throw new DailyReportsDatabaseQueryErrorBase({
          name: 'UNKNOWN',
          message: 'Could not find dailyReport.',
          cause: 'Database.',
        })
      }

      return dailyReport as DailyReport
    } catch (error) {
      throw new Error('Internal Server Error.')
    }
  },

  createOrUpdate: async (data: DailyReportData): Promise<DailyReport> => {
    try {
      const existingReport = await prisma.dailyReport.findFirst({
        where: { day: data.day, userId: data.userId },
      })

      const dailyReport = !!existingReport
        ? await prisma.dailyReport.update({
            where: { id: existingReport.id },
            data,
          })
        : await prisma.dailyReport.create({
            data,
          })

      return dailyReport as DailyReport
    } catch (error) {
      throw new Error('Internal Server Error.')
    }
  },
}
