import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/api/public"],
  afterAuth(auth, req) {
    const isAuthPage = req.url.includes('/sign-in') || req.url.includes('/sign-up');
    
    // If the user is signed in and trying to access auth pages, redirect to dashboard
    if (auth.userId && isAuthPage) {
      return Response.redirect(new URL('/dashboard', req.url));
    }
    
    // If the user is not signed in and trying to access protected pages
    if (!auth.userId && !auth.isPublicRoute) {
      // Construct the URL for your dashboard
      const dashboardUrl = new URL('/dashboard', req.url).toString();
      // Redirect to the Clerk-hosted sign-in page
      const signInUrl = new URL('https://accounts.bionav.qeintech.in/sign-in');
      signInUrl.searchParams.set('redirect_url', dashboardUrl);
      return Response.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: ['/(?!.+\\.[\\w]+$|_next)/', '/', '/(api|trpc)(.*)'],
}; 