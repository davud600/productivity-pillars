import { type PublicUser } from '.'

export type AuthContextData = {
  token: string
  user?: PublicUser
}
