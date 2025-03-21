import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const withoutAuthPages = ["/login", "/register"]; // Pages that don't require authentication

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If the route is in the exception list, allow access
  if (withoutAuthPages.includes(pathname)) {
    return NextResponse.next();
  }

  // If there's no token and the route is protected, redirect to /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/((?!api|_next|static|favicon.ico).*)", // Apply middleware to all routes except API, Next.js internal files, and static assets
};
