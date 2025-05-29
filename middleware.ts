import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/api/public"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 