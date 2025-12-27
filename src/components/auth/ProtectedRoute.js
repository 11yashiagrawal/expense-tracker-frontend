"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@mui/material";
import Loading from "@/components/common/Loading";

// List of protected routes
const PROTECTED_ROUTES = [
  "/dashboard",
  "/expenses",
  "/budgets",
  "/transactions",
  "/subscriptions",
  "/settings",
];

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't block if still loading
    if (isLoading) return;

    // Check if current route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    // Allow navigation between protected routes when authenticated - don't interfere
    if (isAuthenticated && isProtectedRoute) {
      return;
    }

    // Prevent navigation if not authenticated
    if (isProtectedRoute && !isAuthenticated) {
      // Clear any stale session data
      sessionStorage.removeItem("freshLogin");
      // Use replace to prevent back navigation
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  useEffect(() => {
    // Handle browser back/forward navigation
    const handlePopState = () => {
      setTimeout(() => {
        const currentPath = window.location.pathname;
        const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
          currentPath.startsWith(route)
        );
        const hasFreshLogin = sessionStorage.getItem("freshLogin") === "true";

        // Block navigation to protected routes without fresh login
        if (isProtectedRoute && !hasFreshLogin) {
          sessionStorage.removeItem("freshLogin");
          router.replace("/");
        }
      }, 0);
    };

    // Intercept popstate events (browser back/forward buttons)
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <Loading fullScreen />;
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return children;
}

