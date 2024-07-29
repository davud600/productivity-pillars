import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { AuthService } from './services/auth.service'

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!!!token) return NextResponse.redirect(new URL('/login', request.url))

  try {
    await AuthService.validateToken(token)
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/',
}
