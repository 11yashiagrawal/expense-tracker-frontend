"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, Avatar, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { getAllTransactions } from "@/services/transactions";
import { formatCurrency } from "@/utils/formatUtils";
import { formatRelativeDate } from "@/utils/dateUtils";
import * as Icons from "@mui/icons-material";
import Loading from "@/components/common/Loading";

const RecentTransactions = ({ selectedDate }) => {
  const theme = useTheme();
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getAllTransactions();
        const allTransactions = response.data || [];

        // Filter by selected month and year
        const filtered = allTransactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getMonth() === selectedDate.getMonth() &&
            transactionDate.getFullYear() === selectedDate.getFullYear()
          );
        });

        // Sort by date descending
        const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Take recent 5
        setTransactions(sorted.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedDate]); // Re-run when selectedDate changes

  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.Category;
    return <IconComponent sx={{ color: "#fff", fontSize: 20 }} />;
  };

  if (isLoading) {
    return <Loading height="300px" sx={{ mt: 4, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3 }} />;
  }

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        bgcolor: "#000", // Using black background as per image
        borderRadius: 4,
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Recent Transactions
        </Typography>
        <Button
          onClick={() => router.push("/transactions")}
          sx={{
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          View All
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";
          const amountColor = isIncome ? "#10B981" : "#EF4444"; // Green for income, Red for expense
          const sign = isIncome ? "+" : "-";

          return (
            <Box
              key={transaction._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: transaction.category_colour || theme.palette.primary.main,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                  }}
                >
                  {getIcon(transaction.category_icon)}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
                    {transaction.category_title || transaction.title}
                  </Typography>
                  <Typography sx={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                    {formatRelativeDate(transaction.date)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ color: amountColor, fontWeight: 600, fontSize: "1rem" }}>
                  {sign}{formatCurrency(transaction.amount)}
                </Typography>
                <Typography sx={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                  {transaction.title || transaction.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RecentTransactions;
