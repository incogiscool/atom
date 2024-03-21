import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "./lib/server/mongo/init";
import { redirect } from "next/navigation";
import { ratelimit } from "./lib/server/redis/init";
import { ApiResponse } from "./app/api/auth/signup/route";

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const requestPath = request.nextUrl.pathname;
  // const protectedPaths = ["/app"];
  // const sensitivePaths = ["/signup", "/signin"];
  // const isOnProtectedPath = !!protectedPaths.some((path) =>
  //   requestPath.startsWith(path)
  // );
  // const isOnSensitivePath = !!sensitivePaths.some((path) =>
  //   requestPath.startsWith(path)
  // );

  //add rate limiting and protect paths
  const ip = request.ip ?? "127.0.0.1";

  if (requestPath.startsWith("/api")) {
    try {
      const { success } = await ratelimit.limit(ip);

      if (!success) throw new Error("Too many requests.");
    } catch (err: any) {
      console.log(err);

      return NextResponse.json<ApiResponse>({
        response: null,
        success: false,
        message: err.message || err,
      });
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*"],
};
