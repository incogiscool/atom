import { NextRequest } from "next/server";
import { connectToDatabase } from "./lib/server/mongo/init";
import { validateRequest } from "./lib/server/lucia/functions/validaterequest";
import { redirect } from "next/navigation";

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

  try {
    if (requestPath.startsWith("/api")) {
    }
  } catch (err: any) {}
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api"],
};
