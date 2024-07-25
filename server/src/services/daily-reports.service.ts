import fs from 'fs'
import path from 'path'
import { DB_DIR } from '../constants/db'
import { type DailyReportData, type DailyReport } from '../types/daily-reports'
import { DailyReportsDatabaseQueryErrorBase } from './daily-reports.errors'

const table = 'dailyReports.json'

export const DailyReportsService = {
  all: async (userId: number): Promise<DailyReport[]> => {
    const bufferData = fs.readFileSync(process.cwd() + `/db/${table}`)
    const dailyReportsJson = JSON.parse(bufferData.toString())
    let { dailyReports }: { dailyReports: DailyReport[] } = dailyReportsJson

    if (!!!dailyReports) throw Error('Internal Server Error.')

    let i = 1
    while (fs.existsSync(path.join(DB_DIR, i.toString()))) {
      if (fs.existsSync(path.join(DB_DIR, `${i}/${table}`))) {
        const json = require(`/db/${i}/${table}`)
        dailyReports = [...dailyReports, ...json.dailyReports]
      }

      i++
    }

    return dailyReports.filter((dailyReport) => dailyReport.userId === userId)
  },

  get: async (day: string, userId: number): Promise<DailyReport> => {
    const bufferData = fs.readFileSync(process.cwd() + `/db/${table}`)
    const dailyReportsJson = JSON.parse(bufferData.toString())
    let { dailyReports }: { dailyReports: DailyReport[] } = dailyReportsJson

    if (!!!dailyReports) throw Error('Internal Server Error.')

    let i = 1
    while (fs.existsSync(path.join(DB_DIR, i.toString()))) {
      if (fs.existsSync(path.join(DB_DIR, `${i}/${table}`))) {
        const json = require(`/db/${i}/${table}`)
        dailyReports = [...dailyReports, ...json.dailyReports]
      }

      i++
    }

    const dailyReport = dailyReports.find(
      (dailyReport) => dailyReport.userId === userId && dailyReport.day === day
    )

    if (!!!dailyReport)
      throw new DailyReportsDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Could not find dailyReport.',
        cause: 'Database.',
      })

    return dailyReport
  },

  createOrUpdate: async (data: DailyReportData): Promise<DailyReport> => {
    const bufferData = fs.readFileSync(process.cwd() + `/db/${table}`)
    const dailyReportsJson = JSON.parse(bufferData.toString())
    let { dailyReports }: { dailyReports: DailyReport[] } = dailyReportsJson

    if (!!!dailyReports) throw Error('Internal Server Error.')

    let i = 1
    while (fs.existsSync(path.join(DB_DIR, i.toString()))) {
      if (fs.existsSync(path.join(DB_DIR, `${i}/${table}`))) {
        const json = require(`/db/${i}/${table}`)
        dailyReports = [...dailyReports, ...json.dailyReports]
      }

      i++
    }

    const dailyReport: DailyReport = {
      ...data,
      id:
        dailyReports.length === 0
          ? 1
          : dailyReports[dailyReports.length - 1].id + 1,
      createdAt: Date.now().toString(),
    }

    let updatedDailyReports = dailyReports.filter(
      (report) => report.day !== dailyReport.day
    )
    updatedDailyReports = [...updatedDailyReports, dailyReport]

    fs.writeFileSync(
      process.cwd() + `/db/${table}`,
      JSON.stringify({ dailyReports: updatedDailyReports })
    )

    return dailyReport
  },
}
