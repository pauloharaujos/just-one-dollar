import NextAuth from "next-auth";
import { NextResponse } from 'next/server';
import authConfig from "./auth.config";
import { verifyToken } from '@/services/admin/auth/jwtService';

const protectedPaths = [
    '/admin',
    '/orders',
    '/customer/account',
    '/checkout',
    '/cart'
];

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { pathname } = req.nextUrl;
    const isCustomerLoggedIn = !!req.auth;
    const isProtectedPath = protectedPaths.some((route) =>
        pathname.startsWith(route)
    );
    const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
    
    if (isAdminRoute && isProtectedPath) {
        const adminCookie = req.cookies.get('admin_session');
        
        if (!adminCookie) {
            const newUrl = new URL("/admin/login", req.nextUrl.origin);
            return NextResponse.redirect(newUrl);
        }
        
        const session = await verifyToken(adminCookie.value);
        
        if (!session) {
            const newUrl = new URL("/admin/login", req.nextUrl.origin);
            return NextResponse.redirect(newUrl);
        }
    }

    if (isProtectedPath && !isCustomerLoggedIn) {
        const newUrl = new URL("/customer/login", req.nextUrl.origin);
        return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}