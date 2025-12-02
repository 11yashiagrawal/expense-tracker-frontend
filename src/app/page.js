"use client";

import { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Redirect authenticated users away from home page
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
      return;
    }

    // Clear fresh login session when user navigates to home page (only if not authenticated)
    if (!isLoading && !isAuthenticated) {
      sessionStorage.removeItem("freshLogin");
    }
  }, [isAuthenticated, isLoading, router]);

  // Don't render home page content if user is authenticated
  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", gap: "3rem", m: 3, alignItems: "center" }}>
      <Button
        variant="outlined"
        onClick={() => router.push("/auth/login")}
      >
        Login
      </Button>
      <Button 
        variant="contained"
        onClick={() => router.push("/auth/signup")}
      >
        Signup
      </Button>
    </Box>
  );
}
