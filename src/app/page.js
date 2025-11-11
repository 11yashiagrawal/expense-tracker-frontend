"use client";

import { Box, Button } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ display: "flex", gap: "3rem", m: 3, alignItems: "center" }}>
      <Button
        sx={{
          bgcolor: "transparent",
          color: "#14a248",
          borderWidth: "1px solid",
          borderColor: "#14a248",
        }}
      >
        Login
      </Button>
      <Button 
        sx={{ 
          bgcolor: "#14a248", 
          color: "#07130a" 
        }}
      >
        Register
      </Button>
    </Box>
  );
}
