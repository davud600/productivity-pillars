import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { AuthService } from './services/auth.service'

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!!!token || !(await AuthService.validateToken(token)))
    NextResponse.redirect(new URL('/login', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: '/',
}
