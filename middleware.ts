import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || ''
    const isHungarian = acceptLanguage.toLowerCase().includes('hu')

    const locale = isHungarian ? 'hu' : 'en'

    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}