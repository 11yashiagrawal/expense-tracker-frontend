"use client";
import { Box, Typography } from "@mui/material";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import StatCards from "@/components/dashboard/StatCards";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import Budgets from "@/components/dashboard/Budgets";
import IncomeVsExpensesGraph from "@/components/dashboard/IncomeVsExpensesGraph";
import PaymentsHistory from "@/components/dashboard/PaymentsHistory";
import { useTheme } from "@mui/material";

export default function Dashboard() {
  const theme = useTheme();
  return (
    <ProtectedLayout>
        <Typography variant="h5" sx={{ ml: 3,mt: 3, mb: 1, fontWeight: 600, color: theme.palette.text.primary }}>
                Dashboard
              </Typography>
      <Box sx={{ p: 2}}>
        <StatCards />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          <Box sx={{ width: { xs: "100%", md: "66%" } }}>
            <TransactionHistory />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "33%" } }}>
            <Budgets />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 3 }}>
          <Box sx={{ width: { xs: "100%", md: "66%" } }}>
            <IncomeVsExpensesGraph />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "33%" } }}>
            <PaymentsHistory />
          </Box>
        </Box>
      </Box>
    </ProtectedLayout>
  );
}
