import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/links', '/s',]
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
    const isAuthRoute = authRoutes.some(route => path.startsWith(route));

    const session = await auth.api.getSession({
        headers: await headers()
    });

    // If user is authenticated and trying to access auth routes, redirect to dashboard
    if (session?.user && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    // Allow public routes without authentication
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Allow auth routes for non-authenticated users
    if (isAuthRoute && !session?.user) {
        return NextResponse.next();
    }

    // Redirect to /login if the user is not authenticated for protected routes
    if (isProtectedRoute && !session?.user) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // If user is authenticated but accessing unknown routes, redirect to dashboard
    if (session?.user && !isProtectedRoute && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)'
    ],
}