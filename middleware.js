import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { isAuthenticated, getUser } =  getKindeServerSession();

  // 1. Check if the user is authenticated
  if (!(await isAuthenticated())) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(
      new URL('/api/auth/login?post_login_redirect_url=/admin', request.url)
    );
  }

  // 2. The user is authenticated, so now we validate their email
  const user = await getUser();

  // Prevent infinite redirect loops by checking if we're already on the login page
  if (request.nextUrl.pathname.startsWith('/api/auth/login')) {
    return NextResponse.next();
  }

  // Check if the authenticated user's email is allowed (e.g., check if it's 'ojodavid115@gmail.com')
  if (user.email !== 'ojodavid115@gmail.com') {
    // If the user is authenticated but the email is not allowed, redirect them away
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. If authenticated and the email is valid, allow access to the admin page
  return NextResponse.next(); // Proceed to the admin route
}

// Define which routes should use this middleware
export const config = {
  matcher: '/admin/:path*', // Apply the middleware to all /admin routes
};
