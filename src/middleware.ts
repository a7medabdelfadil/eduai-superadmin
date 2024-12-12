import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token') 

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url)); 
    }

    return NextResponse.next(); 
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|static|public|images|login|otp|reset-password|forget-password|favicon.ico).*)',
    ],
}
