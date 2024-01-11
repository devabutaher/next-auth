import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      throw new Error("Invalid token");
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/login?redirectURL=${pathname}`, request.url)
    );
  }
};

export const config = {
  matcher: ["/profile", "/dashboard/:path*"],
};
