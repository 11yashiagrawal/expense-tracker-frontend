"use client";

import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getExpensesForDates } from "@/services/expenses";
import { getMonthDates } from "@/utils/dateUtils";
import { formatCurrency } from "@/utils/formatUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ExpensesOverview = ({ selectedDate }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use selectedDate instead of new Date()
        const currentYear = selectedDate.getFullYear();
        const currentMonth = selectedDate.getMonth();
        
        // Get past 12 months relative to selected date
        const months = [];
        const monthLabels = [];
        
        for (let i = 11; i >= 0; i--) {
          const date = new Date(currentYear, currentMonth - i, 1);
          const monthName = date.toLocaleDateString("en-US", { month: "short" });
          const year = date.getFullYear();
          monthLabels.push(monthName);
          months.push({ month: date.getMonth(), year });
        }

        const expensesPromises = months.map(({ month, year }) => {
          const { start, end } = getMonthDates(year, month);
          return getExpensesForDates(start, end);
        });

        const expensesResponses = await Promise.all(expensesPromises);
        const expensesData = expensesResponses.map(res => res?.data?.total || res?.total || 0);

        setChartData({
          labels: monthLabels,
          datasets: [
            {
              label: "Expenses",
              data: expensesData,
              borderColor: theme.palette.error.main,
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, "rgba(239, 68, 68, 0.3)");
                gradient.addColorStop(1, "rgba(239, 68, 68, 0)");
                return gradient;
              },
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#000",
              pointBorderColor: theme.palette.error.main,
              pointBorderWidth: 2,
              pointHoverBackgroundColor: theme.palette.error.main,
              pointHoverBorderColor: theme.palette.error.main,
              pointHoverBorderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch expenses data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDate.getFullYear()]); // Only re-run if year changes

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#000",
        titleColor: "#9CA3AF",
        bodyColor: theme.palette.error.main,
        padding: 16,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: "normal",
        },
        bodyFont: {
          size: 16,
          weight: "bold",
        },
        callbacks: {
          title: (context) => {
            const monthIndex = context[0].dataIndex;
            const currentYear = selectedDate.getFullYear();
            const currentMonth = selectedDate.getMonth();
            const date = new Date(currentYear, currentMonth - (11 - monthIndex), 1);
            return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
          },
          label: (context) => {
            return `Expenses : ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
          drawBorder: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
          callback: (value) => value,
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  if (isLoading) {
    return (
      <Box sx={{ mt: 4, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        bgcolor: theme.palette.background.paper,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 3 }}>
        Financial Overview
      </Typography>

      <Box sx={{ height: 300, border: "none" }}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default ExpensesOverview;
