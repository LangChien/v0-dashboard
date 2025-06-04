import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const privatePaths = ['/dashboard']
const authPaths = ['/login', '/register', '/restore-password', '/reset-password']

export const middleware = (request: NextRequest) => {
  const { pathname, search, origin } = request.nextUrl
  const prevUrl = `${pathname}${search}`
  const refreshToken = request.cookies.get('refreshToken')?.value
  const accessToken = request.cookies.get('accessToken')?.value

  // xử lý private paths
  if (privatePaths.some((path) => pathname.startsWith(path))) {
    // Chưa đăng nhập thì không cho vào private paths
    if (!refreshToken)
      return NextResponse.redirect(new URL(`/login?redirectUrl=${prevUrl}`, origin))

    // Chưa có access token thì chuyển hướng sang trang refresh token
    if (!accessToken)
      return NextResponse.redirect(
        new URL(`/api/refresh-token?redirectUrl=${prevUrl}&refreshToken=${refreshToken}`, origin),
      )
  }

  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL('/dashboard/protected/profile', origin))
  }

  // /reset-password page
  if (pathname === '/reset-password') {
    const otpToken = request.cookies.has('otpToken')
    if (!otpToken) return NextResponse.redirect(new URL('/login', origin))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/register', '/restore-password', '/reset-password', '/dashboard/:path*'],
}
