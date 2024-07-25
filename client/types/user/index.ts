import { type CommonDatabaseFields } from '..'

export type UserData = {
  username: string
  password: string
}

export type User = UserData & CommonDatabaseFields

export type PublicUserData = Omit<UserData, 'password'>

export type PublicUser = Omit<User, 'password'>

export type Jwt_Payload = {
  userId: number
  username: string
}
