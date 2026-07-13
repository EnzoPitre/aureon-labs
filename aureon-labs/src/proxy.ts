import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isProtectedApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (isProtectedPage || isProtectedApi) {
    const session = req.cookies.get("admin_session")?.value;

    if (!session || session !== process.env.ADMIN_PASSWORD) {
      if (isProtectedApi) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
