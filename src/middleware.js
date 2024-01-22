import { NextResponse } from "next/server";

export function middleware(request) {
  // get auth state from cookie
  const g_state = request.cookies.get("g_state");

  // check if middleware is working
  console.log("hello from middleware");

  if (!g_state) {
    // check redirect is working
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/application-tracker", "/profile", "/inbox"],
};
