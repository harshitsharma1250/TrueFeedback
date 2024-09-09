import { NextRequest, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  //which current url are we on
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
      (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname.startsWith('/')
  )
 ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.redirect(new URL('/home', request.url))
}
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sign-in',
    'sign-up',
    '/',
    '/verify/:path*'],
};
