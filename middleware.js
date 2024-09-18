import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

// Middleware function
export async function middleware(request) {
  const { isAuthenticated, getUser } = await getKindeServerSession();

  // If the user is not authenticated, redirect to login page
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(
      new URL('/api/auth/login?post_login_redirect_url=/admin', request.url)
    );
  }

  // If the user is authenticated, get the user object
  const user = await getUser();

  // Check if the user email is not the specified one, and if so, redirect
  if (user.email !== 'ojodavid115@gmail.com') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is authenticated and has the correct email, allow the request
  return NextResponse.next();
}

// Configuration to match the /admin paths
export const config = {
  matcher: '/admin/:path*',
};
