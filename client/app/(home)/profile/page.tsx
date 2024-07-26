'use client'

import { Icons } from '@/components/icons'
import { useAuth } from '@/hooks/auth'
import { type Jwt_Payload } from '@/types/user'
import { jwtDecode } from 'jwt-decode'

export default function Profile() {
  const { token } = useAuth()

  const user = jwtDecode<Jwt_Payload>(token)

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-3 md:p-12 gap-24 mt-16">
      <section className="h-svh w-full max-w-2xl">
        <h1 className="text-2xl font-semibold">Profile</h1>
        {!!user ? (
          <div className="text-xl">
            <p>Username: {user.username}</p>
          </div>
        ) : (
          <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
        )}
      </section>
    </main>
  )
}
