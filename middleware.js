import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'; 
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request)  {
    const {isAuthenticated , getUser } = await getKindeServerSession();
 if(!(await isAuthenticated())){
    return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/admin', request.url))
 } else {
    if(!(await getUser()).email === 'ojodavid115@gmail.com'){
        return NextResponse.redirect(new URL('/', request.url));
 }
}}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}