"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", gap: "3rem", m: 3, alignItems: "center" }}>
      <Button
        variant="outlined"
        sx={{
          color: "#14a248",
          borderColor: "#14a248"
        }}
        onClick={() => router.push("/auth/login")}
      >
        Login
      </Button>
      <Button 
        variant="contained"
        sx={{ 
          bgcolor: "#14a248", 
          color: "#07130a" 
        }}
        onClick={() => router.push("/auth/signup")}
      >
        Signup
      </Button>
    </Box>
  );
}
