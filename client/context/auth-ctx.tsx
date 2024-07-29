import { type AuthContextData } from '@/types/user/context'
import { type ReactNode, createContext } from 'react'
import Cookies from 'js-cookie'

const initialAuthContextData = {
  token: '',
}

export const AuthContext = createContext<AuthContextData>(
  initialAuthContextData
)

export function AuthProvider({ children }: { children: ReactNode }) {
  const token = Cookies.get('token') || ''

  const value = {
    token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
