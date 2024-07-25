import { AuthContext } from '@/context/auth-ctx'
import { useContext } from 'react'

export function useAuth() {
  return useContext(AuthContext)
}
