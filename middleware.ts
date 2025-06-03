import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // get the current URL and pathname
    const url = new URL(req.url);
    const isHomePage = url.pathname === "/";
    const isAuthPage = url.pathname.includes("/sign-in") || url.pathname.includes("/sign-up");

    // if user is signed in and on home, redirect to dashboard
    if (auth.userId && (isHomePage || isAuthPage)) {
      const dashboardUrl = new URL("/dashboard", req.url);
      return Response.redirect(dashboardUrl);
    }

    // If user is not signed in and trying to access protected routes
    if (!auth.userId && !isHomePage) {
      const signInUrl = new URL("/sign-in", "https://accounts.bionav.qeintech.in");
      signInUrl.searchParams.set("redirect_url", "https://bionav.qeintech.in/dashboard");
      return Response.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 