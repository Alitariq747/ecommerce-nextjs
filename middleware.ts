import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/categories/(.*)",
		"/cart",
		"/categories/products/(.*)",
		"/categories",
		'/api/getCategories'
		
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
