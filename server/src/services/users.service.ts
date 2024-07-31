import { PrismaClient } from '@prisma/client'
import { type UserData, type User } from '../types/users'
import { UsersDatabaseQueryErrorBase } from './users.errors'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const UsersService = {
  all: async (): Promise<User[]> => {
    try {
      const users = await prisma.user.findMany()
      return users as User[]
    } catch (error) {
      throw new Error('Internal Server Error.')
    }
  },

  get: async (username: string): Promise<User> => {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      })

      if (!!!user) {
        throw new UsersDatabaseQueryErrorBase({
          name: 'UNKNOWN',
          message: 'Could not find user.',
          cause: 'Database.',
        })
      }

      return user as User
    } catch (error) {
      throw new Error('Internal Server Error.')
    }
  },

  create: async (userData: UserData): Promise<User> => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      const newUser = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
          createdAt: new Date(),
        },
      })

      return newUser as User
    } catch (error) {
      throw new Error('Internal Server Error.')
    }
  },
}
