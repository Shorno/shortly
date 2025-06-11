import {NextRequest, NextResponse} from "next/server";

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/links', '/s',]
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const sessionToken = req.cookies.get("__Secure-better-auth.session_token") ?? req.cookies.get("better-auth.session_token");

    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
    const isAuthRoute = authRoutes.some(route => path.startsWith(route));


    // If user is authenticated and trying to access auth routes, redirect to dashboard
    if (sessionToken && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    // Allow public routes without authentication
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Allow auth routes for non-authenticated users
    if (isAuthRoute && !sessionToken) {
        return NextResponse.next();
    }

    // Redirect to /login if the user is not authenticated for protected routes
    if (isProtectedRoute && !sessionToken) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // If user is authenticated but accessing unknown routes, redirect to dashboard
    if (sessionToken && !isProtectedRoute && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: [
        // '/((?!api|_next/static|_next/image|.*\\.png$).*)'
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    ],
}