import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";


const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const session = await auth.api.getSession({
        headers: await headers()
    });

    //Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.user) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    //Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        session?.user &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}


// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}