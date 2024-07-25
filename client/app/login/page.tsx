import { Suspense } from 'react'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'

export default async function LoginPage() {
  return (
    <main className="container flex h-[100svh] w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username to sign in to your account
          </p>
        </div>
        <Suspense
          fallback={<Icons.spinner className="mr-2 h-5 w-5 animate-spin" />}
        >
          <UserAuthForm />
        </Suspense>
      </div>
    </main>
  )
}
