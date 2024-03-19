import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
