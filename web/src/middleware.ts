// ⚠️ This middleware has been temporarily disabled to avoid unnecessary edge function executions.
// To re-enable, rename this file to `middleware.ts`.
import {
  NextRequest,
  // NextResponse
} from "next/server";

import { updateSession } from "./lib/supabase/middleware";
// import { authMiddleware } from "./middleware/auth-middleware";

export async function middleware(request: NextRequest) {
  // // authMiddleware
  // const response = authMiddleware(req);
  // if (response) {
  //   return response;
  // }

  // return NextResponse.next();
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
