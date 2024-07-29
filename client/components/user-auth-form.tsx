'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthService } from '@/services/auth.service'
import { useState } from 'react'
import { Icons } from './icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [username, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    setIsLoading(true)

    const loginRes = AuthService.login(username.toLowerCase(), password)

    toast.promise(loginRes, {
      loading: 'Loading...',
      success: (data) => {
        Cookies.set('token', data.token)
        setIsLoading(false)
        setTimeout(() => window.location.replace('/'), 500)

        return (
          <span className="text-green-600 font-medium">Login successful.</span>
        )
      },
      error: (error) => {
        setIsLoading(false)

        return (
          <span className="text-red-600 font-medium">
            {error.toString() || 'Error'}
          </span>
        )
      },
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Email
            </Label>
            <Input
              required
              id="username"
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="text-base"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              required
              id="password"
              placeholder="******"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="text-base"
            />
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
            )}
            Sign In with Username
          </button>
        </div>
      </form>
    </div>
  )
}
