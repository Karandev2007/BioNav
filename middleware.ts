import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/api/public"],
  afterAuth(auth, req) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("https://in-tapir-82.accounts.dev/sign-in");
      signInUrl.searchParams.set("redirect_url", req.url);
      return Response.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 