import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const requestPath = request.nextUrl.pathname;
  const protectedPaths = ["/app"];
  const sensitivePaths = ["/signup", "/signin"];

  //add rate limiting and protect paths
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
