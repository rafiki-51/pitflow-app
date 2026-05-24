import { NextResponse, type NextRequest } from "next/server";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isDashboardPath = path.startsWith(DASHBOARD_ROUTE);
  const isLoginPath = path === LOGIN_ROUTE;

  if (isDashboardPath && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = LOGIN_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoginPath && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = DASHBOARD_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
