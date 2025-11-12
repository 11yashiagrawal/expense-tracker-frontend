"use client";

import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
