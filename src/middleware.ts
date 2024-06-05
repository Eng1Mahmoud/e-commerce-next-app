import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./lib/auth-helper/jwt";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the token from the request headers
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // decode the token
  const { role }: any = decodeToken(token);
  let isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  let userRole = role;
  if (isAdminRoute && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/profile", "/dashboard", "/settings"],
};
