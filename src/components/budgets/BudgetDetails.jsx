"use client";

import { Box, Typography, Paper, LinearProgress, useTheme } from "@mui/material";
import {
  AttachMoney as AttachMoneyIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
} from "@mui/icons-material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { formatCurrency } from "@/utils/formatUtils";
import SpendingAnalysis from "./SpendingAnalysis";

const StatCard = ({ title, amount, icon: Icon, color }) => (
  <Paper
    sx={{
      p: 2.5,
      bgcolor: "#000",
      borderRadius: 6,
      display: "flex",
      flexDirection: "column",
      // gap: 1,
      flex: 1,
      minWidth: 200,
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
        {title}
      </Typography>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          bgcolor: "rgba(255, 255, 255, 0.05)",
          color: color,
          display: "flex",
        }}
      >
        <Icon fontSize="small" />
      </Box>
    </Box>
    <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>
      {formatCurrency(amount)}
    </Typography>
  </Paper>
);

const BudgetDetails = ({ category }) => {
  const theme = useTheme();

  if (!category) {
    return (
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Typography variant="h6" color="text.secondary">
          Select a category to view details
        </Typography>
      </Box>
    );
  }

  const { categoryName, budget, expenditure, colour } = category;
  const remaining = Math.max(0, budget - expenditure);
  const percentage = budget > 0 ? (expenditure / budget) * 100 : 0;
  const isOverBudget = percentage > 100;

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          {categoryName}
        </Typography>
        <Typography variant="body1" sx={{ color: "#9CA3AF" }}>
          Budget overview and analysis
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
        <StatCard
          title="Total Budget"
          amount={budget}
          icon={AttachMoneyIcon}
          color="#10B981"
        />
        <StatCard
          title="Spent"
          amount={expenditure}
          icon={CreditCardIcon}
          color="#F59E0B"
        />
        <StatCard
          title="Remaining"
          amount={remaining}
          icon={WalletIcon}
          color="#10B981"
        />
      </Box>

      <Paper
        sx={{
          p: 4,
          bgcolor: "#000",
          borderRadius: 7,
        }}
      >
        <Typography variant="body1" sx={{ mb: 4, fontWeight: 600 }}>
          Budget Utilization
        </Typography>

        <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {formatCurrency(expenditure)} spent
          </Typography>
          <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
            {formatCurrency(budget)} total
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={Math.min(percentage, 100)}
          sx={{
            height: 8,
            borderRadius: 6,
            bgcolor: "rgba(255, 255, 255, 0.1)",
            mb: 2,
            "& .MuiLinearProgress-bar": {
              bgcolor: theme.palette.warning.main,
              borderRadius: 6,
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: theme.palette.warning.main, fontWeight: 600 }}>
            {Math.round(percentage)}% of budget used
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {formatCurrency(remaining)} remaining
          </Typography>
        </Box>
      </Paper>

      {/* Spending Analysis Chart */}
      <SpendingAnalysis category={category} />
    </Box>
  );
};

export default BudgetDetails;
