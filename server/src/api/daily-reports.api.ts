import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.middleware'
import { DailyReportsDatabaseQueryErrorBase } from '../services/daily-reports.errors'
import { DailyReportsService } from '../services/daily-reports.service'
import { PublicDailyReportData } from '../types/daily-reports'
import { type Jwt_Payload } from '../types/users'

export const dailyReportsApi = Router()
const dailyReportsRoutePath = '/api/daily-reports'
dailyReportsApi.use(authenticateToken)

dailyReportsApi.get(`${dailyReportsRoutePath}`, async (req, res) => {
  try {
    const dailyReports = await DailyReportsService.all(
      ((req as any).user as Jwt_Payload).userId
    )

    return res.json({ data: dailyReports })
  } catch (error) {
    console.error(`get dailyReportsApi`, error)

    if (error instanceof DailyReportsDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

dailyReportsApi.get(`${dailyReportsRoutePath}/:day`, async (req, res) => {
  const day = req.params.day

  if (!!!day)
    return res.status(400).json({ error: { message: 'Invalid input day.' } })

  try {
    const dailyReport = await DailyReportsService.get(
      day,
      ((req as any).user as Jwt_Payload).userId
    )

    return res.json({ data: dailyReport })
  } catch (error) {
    console.error(`get dailyReportsApi.day=${day}`, error)

    if (error instanceof DailyReportsDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

dailyReportsApi.post(`${dailyReportsRoutePath}`, async (req, res) => {
  const dailyReportData = req.body.data as PublicDailyReportData

  if (!!!dailyReportData)
    return res.status(400).json({ error: { message: 'Invalid input data.' } })

  try {
    const dailyReport = await DailyReportsService.createOrUpdate({
      ...dailyReportData,
      userId: ((req as any).user as Jwt_Payload).userId,
    })

    return res.json({ data: dailyReport })
  } catch (error) {
    console.error(
      `create dailyReportsApi.data=${JSON.stringify(dailyReportData)}`,
      error
    )

    if (error instanceof DailyReportsDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})
