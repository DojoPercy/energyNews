// middleware.js
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { isAuthenticated } =  getKindeServerSession();
  console.log('isAuthenticated:', await isAuthenticated()); 

  // Check if the user is authenticated
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }
  console.log('dan');
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
