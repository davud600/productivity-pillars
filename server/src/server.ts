import cors from 'cors'
import express, { type Router } from 'express'
import { createServer } from 'http'

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
const routes: Router[] = []
routes.forEach((route) => {
  app.use(route)
})