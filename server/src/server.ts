import cors from 'cors'
import express, { type Router } from 'express'
import { createServer } from 'http'
import { authApi } from './api/auth.api'
import { dailyReportsApi } from './api/daily-reports.api'
import { usersApi } from './api/users.api'

import { CORS_ORIGIN } from './utils/env'

// Express app and socket server
export const app = express()
export const server = createServer(app)

app.use(express.json())
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
)

// Init routes and api's
const routes: Router[] = [authApi, usersApi, dailyReportsApi]
routes.forEach((route) => {
  app.use(route)
})
