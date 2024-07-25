import { type PublicUser } from '@/types/user'
import { type AuthContextData } from '@/types/user/context'
import { type ReactNode, createContext } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const initialAuthContextData = {
  token: '',
}

export const AuthContext = createContext<AuthContextData>(
  initialAuthContextData
)

export function AuthProvider({ children }: { children: ReactNode }) {
  const token = Cookies.get('token') || ''
  // const user = jwtDecode<PublicUser>(token)

  const value = {
    token,
    // user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
