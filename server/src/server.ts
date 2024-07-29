import cors from 'cors'
import express, { type Router } from 'express'
import { createServer } from 'http'
import { authApi } from './api/auth.api'
import { dailyReportsApi } from './api/daily-reports.api'
import { usersApi } from './api/users.api'
import { UsersService } from './services/users.service'

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
// app.use(async (req, res) => {
//   const username = req.body.username
//   const password = req.body.password

//   if (!!!username)
//     return res
//       .status(400)
//       .json({ error: { message: 'Invalid input username.' } })

//   if (!!!password)
//     return res
//       .status(400)
//       .json({ error: { message: 'Invalid input password.' } })

//   try {
//     const user = await UsersService.create({ username, password })

//     return res.json({ data: user })
//   } catch (error) {
//     console.error(`post usersApi`, error)

//     return res
//       .status(500)
//       .json({ error: { message: 'Internal server error.' } })
//   }
// })

// Init routes and api's
const routes: Router[] = [authApi, usersApi, dailyReportsApi]
routes.forEach((route) => {
  app.use(route)
})
