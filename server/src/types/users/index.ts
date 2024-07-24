import { type CommonDatabaseFields } from '..'

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export type UserData = {
  name: string
  email: string
  password: string
  role: UserRole
}

export type User = UserData & CommonDatabaseFields

export type PublicUserData = Omit<UserData, 'password'>

export type PublicUser = Omit<User, 'password'>

export type Jwt_Payload = {
  userId: number
  isAdmin: boolean
  name: string
  email: string
}