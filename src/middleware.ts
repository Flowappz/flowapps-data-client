import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateBasicAuth } from "./utils/auth";

const APP_ROUTES = "/api/app*";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (validateBasicAuth(req.headers)) {
    return NextResponse.next();
  } else
    return Response.json(
      { message: "Invalid Authentication Credentials" },
      {
        status: 401,
      },
    );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [APP_ROUTES],
};
