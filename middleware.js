import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (
    // pathname.startsWith("/api") ||
    pathname.startsWith("/login") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // If not logged in, redirect to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based protection
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (pathname.startsWith("/dashboard") && token.role !== "user") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};