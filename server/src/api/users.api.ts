import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.middleware'
import { UsersDatabaseQueryErrorBase } from '../services/users.errors'
import { UsersService } from '../services/users.service'

export const usersApi = Router()
const usersRoutePath = '/api/users'
usersApi.use(authenticateToken)

usersApi.get(`${usersRoutePath}/:username`, async (req, res) => {
  const username = req.params.username

  if (!!!username)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input username.' } })

  try {
    const user = await UsersService.get(username)

    return res.json({ data: user })
  } catch (error) {
    console.error(`get usersApi.id=${username}`, error)

    if (error instanceof UsersDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})
