import { Router } from 'express'
import { UserService } from '../services/user.service'
import { PublicUser, type UserData } from '../types/user'
import { UserDatabaseQueryErrorBase } from '../services/user.errors'
import { validateUserData } from '../middleware/user.middleware'
import { UserMiddlewareErrorBase } from '../middleware/users.errors'
import {
  authenticateToken,
  authorizeToken,
} from '../middleware/auth.middleware'

export const userApi = Router()
const userRoutePath = '/api/user'
userApi.use(authenticateToken)
userApi.use(authorizeToken)

// GET all users
userApi.get(`${userRoutePath}`, async (req, res) => {
  let fetchSoftDeleted = false

  if (req.query.fetchSoftDeleted)
    fetchSoftDeleted = req.query.fetchSoftDeleted === 'true'

  try {
    const users = await UserService.get(fetchSoftDeleted)

    return res.json({ data: users })
  } catch (error) {
    console.error('get userApi', error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// GET user by ID
userApi.get(`${userRoutePath}/:id`, async (req, res) => {
  const userId = parseInt(req.params.id)

  if (!!!userId)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input user id.' } })

  try {
    const user = await UserService.getById(userId)

    return res.json({ data: user })
  } catch (error) {
    console.error(`get userApi.id=${req.params.id}`, error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// CREATE a new user
userApi.post(`${userRoutePath}`, async (req, res) => {
  const userData = req.body as UserData

  try {
    validateUserData(userData)
    const createduser = await UserService.create({
      ...userData,
    })

    return res.json({ data: createduser })
  } catch (error) {
    console.error('post userApi', error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    if (error instanceof UserMiddlewareErrorBase)
      return res.status(401).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// CREATE bulk
userApi.post(`${userRoutePath}/create-bulk`, async (req, res) => {
  const { usersData } = req.body as {
    usersData: Array<UserData>
  }

  try {
    let createdUsers: PublicUser[] = []

    for (let i = 0; i < usersData.length; i++) {
      validateUserData(usersData[i])
      createdUsers = [...createdUsers, await UserService.create(usersData[i])]
    }

    return res.json({ data: createdUsers })
  } catch (error) {
    console.error('post userApi', error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    if (error instanceof UserMiddlewareErrorBase)
      return res.status(401).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// UPDATE an existing user
userApi.put(`${userRoutePath}/:id`, async (req, res) => {
  const userId = parseInt(req.params.id)
  const userData = req.body as Partial<UserData>

  if (!!!userId)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input user id.' } })

  try {
    validateUserData(userData)
    const updateduser = await UserService.update(userId, {
      ...userData,
    })

    return res.json({ data: updateduser })
  } catch (error) {
    console.error(`put userApi.id=${req.params.id}`, error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    if (error instanceof UserMiddlewareErrorBase)
      return res.status(401).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// RESTORE a user
userApi.patch(`${userRoutePath}/:id/restore`, async (req, res) => {
  const userId = parseInt(req.params.id)

  if (!!!userId)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input user id.' } })

  try {
    const updateduser = await UserService.restore(userId)

    return res.json({ data: updateduser })
  } catch (error) {
    console.error(`patch userApi.id=${req.params.id}.restore`, error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// RESTORE bulk
userApi.patch(`${userRoutePath}/restore`, async (req, res) => {
  const userIds = req.query.ids as string

  if (!!!userIds)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input user ids.' } })

  try {
    let restoredUsers: PublicUser[] = []

    for (let i = 0; i < userIds.split(',').length; i++) {
      const updateduser = await UserService.restore(
        parseInt(userIds.split(',')[i])
      )

      restoredUsers = [...restoredUsers, updateduser]
    }

    return res.json({ data: restoredUsers })
  } catch (error) {
    console.error(`patch userApi.restore`, error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// SOFT DELETE a user
userApi.patch(`${userRoutePath}/:id/soft-delete`, async (req, res) => {
  const userId = parseInt(req.params.id)

  if (!!!userId)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input user id.' } })

  try {
    const updateduser = await UserService.softDelete(userId)

    return res.json({ data: updateduser })
  } catch (error) {
    console.error(`patch userApi.id=${req.params.id}.soft-delete`, error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// SOFT DELETE bulk
userApi.patch(`${userRoutePath}/soft-delete`, async (req, res) => {
  const userIds = req.query.ids as string

  if (!!!userIds)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input user ids.' } })

  try {
    let softDeletedUsers: PublicUser[] = []

    for (let i = 0; i < userIds.split(',').length; i++) {
      const updateduser = await UserService.softDelete(
        parseInt(userIds.split(',')[i])
      )

      softDeletedUsers = [...softDeletedUsers, updateduser]
    }

    return res.json({ data: softDeletedUsers })
  } catch (error) {
    console.error(`patch userApi.soft-delete?ids=${req.query.ids}`, error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// DELETE a user
userApi.delete(`${userRoutePath}/:id`, async (req, res) => {
  const userId = parseInt(req.params.id)

  if (!!!userId)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input user id.' } })

  try {
    const deleteduser = await UserService.delete(userId)

    return res.json({ data: deleteduser })
  } catch (error) {
    console.error(`delete userApi.id=${req.params.id}`, error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})

// DELETE bulk
userApi.patch(`${userRoutePath}/delete`, async (req, res) => {
  const userIds = req.query.ids as string

  if (!!!userIds)
    return res
      .status(400)
      .json({ error: { message: 'Invalid input user ids.' } })

  try {
    let deletedUsers: PublicUser[] = []

    for (let i = 0; i < userIds.split(',').length; i++) {
      const updateduser = await UserService.delete(
        parseInt(userIds.split(',')[i])
      )

      deletedUsers = [...deletedUsers, updateduser]
    }

    return res.json({ data: deletedUsers })
  } catch (error) {
    console.error(`delete userApi.delete?ids=${req.query.ids}`, error)

    if (error instanceof UserDatabaseQueryErrorBase)
      return res.status(400).json({ error })

    return res
      .status(500)
      .json({ error: { message: 'Internal server error.' } })
  }
})