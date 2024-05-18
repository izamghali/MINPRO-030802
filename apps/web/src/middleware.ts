import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { parseJwt } from './helpers/auth/token';
import { decode } from 'punycode';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const tokenCookie = req.cookies.get('token'); // Get the cookie object
    const token = tokenCookie ? tokenCookie.value : null;
    const url = req.nextUrl.pathname;
    // console.log('(next.js middleware) token:', token)

    // Define public routes
    const publicPaths = ['/'];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL(`/`, req.url));
    }

    try {
        // Verify token
        const decoded = parseJwt(token);
        // console.log('(next.js middleware) decoded:', decoded)

        // Check user role for specific routes
        if (pathname.startsWith('/dashboard/organizer')) {
            if (decoded.isOrg !== true) {
                if (token) { 
                    return NextResponse.redirect(new URL('/dashboard/user', req.url)); // Forbidden
                } else {
                    return NextResponse.redirect(new URL('/', req.url)); // Forbidden
                }
            }
        } else if (pathname.startsWith('/homepage')) {
            if (decoded.isOrg !== false) {
                if (token) {
                    return NextResponse.redirect(new URL('/dashboard/organizer', req.url)); // Forbidden
                } else {
                    return NextResponse.redirect(new URL('/', req.url)); // Forbidden
                }
            }
        } else if (pathname.startsWith('/dashboard/user')) {
            if (decoded.isOrg !== false) {
                if (token) {
                    return NextResponse.redirect(new URL('/dashboard/organizer', req.url)); // Forbidden
                } else {
                    return NextResponse.redirect(new URL('/', req.url)); // Forbidden
                }
            }
        }

        // Add more role checks here for other paths if needed

    } catch (err) {
        // Token verification failed, redirect to login
        const loginUrl = new URL('/', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/organizer/:path*', // Protect all /organizer routes
        '/dashboard/user/:path*', // Protect all /user routes
        '/homepage/:path*',  // Protect all /user routes
    ],
};
