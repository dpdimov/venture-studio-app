import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Login page is always accessible
    if (req.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = req.nextauth.token;
    if (!token?.isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/admin/login") return true;
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*"],
};
