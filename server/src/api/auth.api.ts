import { Router } from 'express'
import { UsersDatabaseQueryErrorBase } from '../services/users.errors'
import { UsersService } from '../services/users.service'
import { JWT_EXPIRATION, JWT_SECRET } from '../utils/env'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const authApi = Router()
const authRoutePath = '/api/auth'

authApi.get(`${authRoutePath}`, async (req, res) => {
  const token = req.query.token

  if (!!!token) return res.status(400).json({ message: 'No token provided.' })

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET)
    ;(req as any).user = decoded

    return res.sendStatus(200)
  } catch (error) {
    console.log('get authApi', error)

    if (error instanceof UsersDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

authApi.post(`${authRoutePath}/login`, async (req, res) => {
  const { username, password } = req.body

  if (!!!username || !!!password)
    return res
      .status(400)
      .json({ message: 'Username and password are required' })

  try {
    const user = await UsersService.get(username)

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ error: { message: 'Invalid username or password' } })

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    )

    return res.json({ token })
  } catch (error) {
    console.log('post authApi', error)

    if (error instanceof UsersDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})
