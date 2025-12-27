"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { loginUser, logoutUser } from "@/services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if there's a stored auth token/session
      const authToken = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");

      if (authToken && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (formData) => {
    try {
      const response = await loginUser(formData);
      if (response?.success) {
        // Store auth token and user data
        localStorage.setItem("authToken", response.token || "authenticated");
        localStorage.setItem("user", JSON.stringify(response.user || {}));
        // Set session flag to track fresh login - cleared when navigating to home
        sessionStorage.setItem("freshLogin", "true");
        setUser(response.user || {});
        return { success: true, ...response };
      }
      return { success: false, message: response?.message || "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      // Clear storage first for synchronous effect
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      sessionStorage.removeItem("freshLogin");
      setUser(null);

      // Redirect immediately to prevent further renders of protected components
      router.push("/");

      // Silently call logout API in background
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Compute authentication status dynamically
  // Also check for freshLogin flag - user must have logged in recently
  const isAuthenticated = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hasAuth = !!user && !!localStorage.getItem("authToken");
    const hasFreshLogin = sessionStorage.getItem("freshLogin") === "true";
    return hasAuth && hasFreshLogin;
  }, [user]);

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

