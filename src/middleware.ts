import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    return NextResponse.next();
  } catch (error) {
    console.error(error);
  }
};
