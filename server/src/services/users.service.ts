import { type PublicUser, type UserData } from '../types/users'
import { UserDatabaseQueryErrorBase } from './users.errors'

export const UserService = {
  get: async (fetchSoftDeleted = false): Promise<PublicUser[]> => {
    const users = await prisma.user.findMany({
      where: fetchSoftDeleted
        ? {
            deletedAt: {
              not: null,
            },
          }
        : {
            deletedAt: null,
          },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    })

    if (!!!users)
      throw new UserDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Failed to retrieve users.',
        cause: 'Database.',
      })

    return users as PublicUser[]
  },

  getById: async (id: number): Promise<PublicUser> => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    })

    if (!!!user)
      throw new UserDatabaseQueryErrorBase({
        name: 'NOT_FOUND',
        message: 'user was not found.',
        cause: 'Database.',
      })

    return user as PublicUser
  },

  getByEmail: async (email: string): Promise<User> => {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!!!user)
      throw new UserDatabaseQueryErrorBase({
        name: 'NOT_FOUND',
        message: 'user was not found.',
        cause: 'Database.',
      })

    return user
  },

  create: async (data: UserData): Promise<PublicUser> => {
    const userData = data

    const user = await prisma.user.create({
      data: { ...userData, password: await bcrypt.hash(userData.password, 10) },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    })

    if (!!!user)
      throw new UserDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Unable to create user.',
        cause: 'Database.',
      })

    return user as PublicUser
  },

  update: async (id: number, data: Partial<User>): Promise<PublicUser> => {
    const userData = data

    if (userData.password && userData.password !== '') {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      userData.password = hashedPassword
    }

    const user = await prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    })

    if (!!!user)
      throw new UserDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Unable to update user.',
        cause: 'Database.',
      })

    return user as PublicUser
  },

  restore: async (id: number): Promise<PublicUser> => {
    const user = await prisma.user.update({
      where: { id },
      data: { deletedAt: null },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    })

    if (!!!user)
      throw new UserDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Unable to restore user.',
        cause: 'Database.',
      })

    return user as PublicUser
  },

  softDelete: async (id: number): Promise<PublicUser> => {
    const user = await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    })

    if (!!!user)
      throw new UserDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Unable to soft delete user.',
        cause: 'Database.',
      })

    return user as PublicUser
  },

  delete: async (id: number): Promise<PublicUser> => {
    const user = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    })

    if (!!!user)
      throw new UserDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Unable to delete user.',
        cause: 'Database.',
      })

    return user as PublicUser
  },
}