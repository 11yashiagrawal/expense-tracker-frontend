"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// List of protected routes
const PROTECTED_ROUTES = [
  "/dashboard",
  "/expenses",
  "/budgets",
  "/transactions",
  "/subscriptions",
  "/settings",
];

// List of public routes that authenticated users should not access
const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/signup",
];

export default function NavigationGuard({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't block if still loading
    if (isLoading) return;

    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      pathname === route || pathname.startsWith(route)
    );
    const isHomePage = pathname === "/";

    // Allow navigation between protected routes when authenticated - don't interfere
    if (isAuthenticated && isProtectedRoute) {
      return;
    }

    // If authenticated user tries to access public routes, redirect to dashboard
    if (isAuthenticated && isPublicRoute) {
      router.replace("/dashboard");
      return;
    }

    // Clear fresh login session when navigating to home page (only if not authenticated)
    if (isHomePage && !isAuthenticated) {
      sessionStorage.removeItem("freshLogin");
    }

    // Block access to protected routes if not authenticated
    if (isProtectedRoute && !isAuthenticated) {
      router.replace("/");
    }
  }, [pathname, isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Handle browser back/forward navigation
    const handlePopState = () => {
      // Re-check authentication on popstate
      setTimeout(() => {
        const currentPath = window.location.pathname;
        const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
          currentPath.startsWith(route)
        );
        const isPublicRoute = PUBLIC_ROUTES.some((route) =>
          currentPath === route || currentPath.startsWith(route)
        );
        const isHomePage = currentPath === "/";
        const hasFreshLogin = sessionStorage.getItem("freshLogin") === "true";
        const authToken = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user");
        const isAuthenticatedUser = !!authToken && !!userData && hasFreshLogin;

        // Redirect authenticated users away from public routes
        if (isAuthenticatedUser && isPublicRoute) {
          router.replace("/dashboard");
          return;
        }

        // Clear freshLogin when navigating to home page (only if not authenticated)
        if (isHomePage && !isAuthenticatedUser) {
          sessionStorage.removeItem("freshLogin");
        }

        // Block navigation to protected routes without fresh login
        if (isProtectedRoute && !hasFreshLogin) {
          sessionStorage.removeItem("freshLogin");
          router.replace("/");
        }
      }, 0);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return <>{children}</>;
}

