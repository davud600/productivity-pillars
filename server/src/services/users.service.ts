import fs from 'fs'
import path from 'path'
import { DB_DIR } from '../constants/db'
import { type UserData, type User } from '../types/users'
import { UsersDatabaseQueryErrorBase } from './users.errors'
import bcrypt from 'bcrypt'

const table = 'users.json'

export const UsersService = {
  get: async (username: string): Promise<User> => {
    const bufferData = fs.readFileSync(process.cwd() + `/db/${table}`)
    const usersJson = JSON.parse(bufferData.toString())
    let { users }: { users: User[] } = usersJson

    if (!!!users) throw Error('Internal Server Error.')

    let i = 1
    while (fs.existsSync(path.join(DB_DIR, i.toString()))) {
      if (fs.existsSync(path.join(DB_DIR, `${i}/${table}`))) {
        const json = require(`/db/${i}/${table}`)
        users = [...users, ...json.users]
      }

      i++
    }

    const user = users.find((user) => user.username === username)

    if (!!!user)
      throw new UsersDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Could not find user.',
        cause: 'Database.',
      })

    return user
  },

  create: async (userData: UserData): Promise<User> => {
    const bufferData = fs.readFileSync(process.cwd() + `/db/${table}`)
    const usersJson = JSON.parse(bufferData.toString())
    let { users }: { users: User[] } = usersJson

    if (!!!users) throw Error('Internal Server Error.')

    let i = 1
    while (fs.existsSync(path.join(DB_DIR, i.toString()))) {
      if (fs.existsSync(path.join(DB_DIR, `${i}/${table}`))) {
        const json = require(`/db/${i}/${table}`)
        users = [...users, ...json.users]
      }

      i++
    }

    if (!!!users)
      throw new UsersDatabaseQueryErrorBase({
        name: 'UNKNOWN',
        message: 'Could not find users.',
        cause: 'Database.',
      })

    const newUser = {
      ...userData,
      id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
      createdAt: new Date().toString(),
      password: await bcrypt.hash(userData.password, 10),
    }

    const updatedUsers = [...users, newUser]

    fs.writeFileSync(
      process.cwd() + `/db/${table}`,
      JSON.stringify({ users: updatedUsers })
    )

    return newUser
  },
}
