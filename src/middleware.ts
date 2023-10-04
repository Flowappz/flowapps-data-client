import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateBasicAuth } from "./utils/auth";


// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
        "Access-Control-Allow-Headers":
          "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      },
    });
  }

  if (validateBasicAuth(req.headers)) {
    const res = NextResponse.next();

    res.headers.append("Access-Control-Allow-Credentials", "true");
    res.headers.append("Access-Control-Allow-Origin", "*");
    res.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT",
    );
    res.headers.append(
      "Access-Control-Allow-Headers",
      "Authorization, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
    );

    return res;
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
  matcher: "/(api/app.*)",
};
