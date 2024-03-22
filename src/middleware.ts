import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    console.log(request.cookies.has('authApiKey'));
    console.log(request.nextUrl.pathname.startsWith('/'));
    
    if(request.cookies.has('authApiKey') && request.nextUrl.pathname.startsWith('/signup') ||request.nextUrl.pathname.startsWith('/login')){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(!request.cookies.has('authApiKey') && request.nextUrl.pathname.startsWith('/') || request.nextUrl.pathname.startsWith('/profile/:path*')){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:['/' , '/login' , '/signup' , '/profile/:path*'],
}