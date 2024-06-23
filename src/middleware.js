import NextAuth from "next-auth";
import { authConfig } from "../auth.config";

import { LOGIN, PRIVATE_ROUTES } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  const isPrivateRoute = PRIVATE_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (!isAuthenticated && isPrivateRoute){
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
    
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
