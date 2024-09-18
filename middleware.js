import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { isAuthenticated, getUser } = await getKindeServerSession();

  // Check if the request is already handling the callback (i.e., on the login or callback route)
  if (request.nextUrl.pathname.startsWith('/api/auth/kinde_callback')) {
    return NextResponse.next(); // Allow the authentication callback to proceed
  }

  // Check if the user is authenticated
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(
      new URL('/api/auth/login?post_login_redirect_url=/admin', request.url)
    );
  }

  // User is authenticated, now validate their email
  const user = await getUser();

  // Prevent multiple redirects by checking if the request is already on login page
  if (request.nextUrl.pathname === '/api/auth/login') {
    return NextResponse.next();
  }

  // Check if the user's email matches the required email
  if (user.email !== 'ojodavid115@gmail.com') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next(); // Allow access to the admin route
}

// Configure the matcher to apply middleware only to admin routes
export const config = {
  matcher: '/admin/:path*',
};
