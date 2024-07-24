import { type UserData } from '../types/users'
import { UserMiddlewareErrorBase } from './users.errors'

export const validateUserData = (data: Partial<UserData>): void => {
  if (data['name'] && typeof data.name !== 'string')
    throw new UserMiddlewareErrorBase({
      name: 'INVALID_DATA',
      message: 'Invalid input name, it must be a string.',
      cause: 'Middleware.',
    })

  if (data['email'] && typeof data.email !== 'string')
    throw new UserMiddlewareErrorBase({
      name: 'INVALID_DATA',
      message: 'Invalid input email, it must be a string.',
      cause: 'Middleware.',
    })

  if (data['password'] && typeof data.password !== 'string')
    throw new UserMiddlewareErrorBase({
      name: 'INVALID_DATA',
      message: 'Invalid input password, it must be a string.',
      cause: 'Middleware.',
    })
}