// middleware.js
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { isAuthenticated } =  getKindeServerSession();

  // Check if the user is authenticated
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};