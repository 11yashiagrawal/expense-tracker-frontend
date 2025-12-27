"use client";

import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { getCurrentUser } from "@/services/user";
import { getIncomeForDates } from "@/services/income";
import { getExpensesForDates } from "@/services/expenses";

import { getMonthDates } from "@/utils/dateUtils";
import { formatCurrency, calculatePercentageChange } from "@/utils/formatUtils";

export default function StatCards() {
  const theme = useTheme();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [incomePercentage, setIncomePercentage] = useState(null);
  const [expensesPercentage, setExpensesPercentage] = useState(null);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [lastMonthExpenses, setLastMonthExpenses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        // Get current month dates
        const currentMonthDates = getMonthDates(currentYear, currentMonth);

        // Get last month dates
        const lastMonthDates = getMonthDates(
          currentYear,
          currentMonth - 1
        );

        // Fetch all data in parallel
        const [
          userResponse,
          currentIncomeResponse,
          lastMonthIncomeResponse,
          currentExpensesResponse,
          lastMonthExpensesResponse,
        ] = await Promise.all([
          getCurrentUser(),
          getIncomeForDates(
            currentMonthDates.start,
            currentMonthDates.end
          ),
          getIncomeForDates(
            lastMonthDates.start,
            lastMonthDates.end
          ),
          getExpensesForDates(
            currentMonthDates.start,
            currentMonthDates.end
          ),
          getExpensesForDates(
            lastMonthDates.start,
            lastMonthDates.end
          ),
        ]);
        // console.log(userResponse);
        // console.log(currentIncomeResponse);
        // console.log(lastMonthIncomeResponse);
        // console.log(currentExpensesResponse);
        // console.log(lastMonthExpensesResponse);
        // Set current balance from user data
        if (userResponse?.data?.balance !== undefined) {
          setCurrentBalance(userResponse.data.balance);
        }

        // Set income data
        // API response structure: { data: { total: ... } }
        const currentIncome = currentIncomeResponse?.data?.total || currentIncomeResponse?.total || 0;
        const previousIncome = lastMonthIncomeResponse?.data?.total || lastMonthIncomeResponse?.total || 0;
        setTotalIncome(currentIncome);
        setLastMonthIncome(previousIncome);
        const incomeChange = calculatePercentageChange(
          currentIncome,
          previousIncome
        );
        setIncomePercentage(incomeChange);

        // Set expenses data
        // API response structure: { data: { total: ... } }
        const currentExpenses = currentExpensesResponse?.data?.total || currentExpensesResponse?.total || 0;
        const previousExpenses = lastMonthExpensesResponse?.data?.total || lastMonthExpensesResponse?.total || 0;
        setTotalExpenses(currentExpenses);
        setLastMonthExpenses(previousExpenses);
        const expensesChange = calculatePercentageChange(
          currentExpenses,
          previousExpenses
        );
        setExpensesPercentage(expensesChange);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, percentage, lastMonthValue, showPercentage = true }) => {
    const isPositive = percentage !== null && parseFloat(percentage) >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 7,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minHeight: 100,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.text.primary,
            fontSize: "2rem",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {isLoading ? "..." : formatCurrency(value)}
        </Typography>
        {showPercentage && percentage !== null && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: "auto",
            }}
          >
            <TrendIcon
              sx={{
                fontSize: 18,
                color: isPositive
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: isPositive
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {Math.abs(parseFloat(percentage))}%
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.875rem",
                ml: 1,
              }}
            >
              Last month {formatCurrency(lastMonthValue)}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
        mb: 4,
      }}
    >
      <StatCard
        title="Total Balance"
        value={currentBalance}
        showPercentage={false}
      />
      <StatCard
        title="Total Income This Month"
        value={totalIncome}
        percentage={incomePercentage}
        lastMonthValue={lastMonthIncome}
      />
      <StatCard
        title="Total Expenses This Month"
        value={totalExpenses}
        percentage={expensesPercentage}
        lastMonthValue={lastMonthExpenses}
      />
    </Box>
  );
}

