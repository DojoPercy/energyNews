import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  try {
    const { isAuthenticated, getUser } = await getKindeServerSession();

    // Check if the user is authenticated
    if (!(await isAuthenticated())) {
      return NextResponse.redirect(
        new URL('/api/auth/login?post_login_redirect_url=/admin', request.url)
      );
    }

    // Get user details
    const user = await getUser();

    // Check user email
    if (user.email !== 'ojodavid115@gmail.com') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next(); // Proceed if authenticated and email is correct
  } catch (error) {
    console.error("Middleware authentication error:", error);
    return NextResponse.redirect(new URL('/api/auth/login', request.url)); // Fallback to login
  }
}

export const config = {
  matcher: '/admin/:path*',
};
