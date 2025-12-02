"use client";

import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getIncomeForDates } from "@/services/income";
import { getExpensesForDates } from "@/services/expenses";
import { getMonthDates } from "@/utils/dateUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeVsExpensesGraph = () => {
  const theme = useTheme();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const incomePromises = months.map((_, index) => {
          const { start, end } = getMonthDates(currentYear, index);
          return getIncomeForDates(start, end);
        });

        const expensesPromises = months.map((_, index) => {
          const { start, end } = getMonthDates(currentYear, index);
          return getExpensesForDates(start, end);
        });

        const [incomeResponses, expensesResponses] = await Promise.all([
          Promise.all(incomePromises),
          Promise.all(expensesPromises),
        ]);

        const incomeData = incomeResponses.map(res => res?.data?.total || res?.total || 0);
        const expensesData = expensesResponses.map(res => res?.data?.total || res?.total || 0);

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              backgroundColor: "#10B981", // Green
              borderRadius: 4,
              barPercentage: 0.6,
              categoryPercentage: 0.8,
            },
            {
              label: "Expenses",
              data: expensesData,
              backgroundColor: "#E5E7EB", // Grey/White
              borderRadius: 4,
              barPercentage: 0.6,
              categoryPercentage: 0.8,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide default legend as per design (or custom if needed)
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#9CA3AF",
        bodyColor: "#F3F4F6",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: () => "INCOME      EXPENSES", // Custom header
          label: (context) => {
             // This is tricky to match exact design with single tooltip showing both values side by side
             // Standard tooltip shows one line per dataset
             let label = context.dataset.label || '';
             if (label) {
                 label += ': ';
             }
             if (context.parsed.y !== null) {
                 label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
             }
             return label;
          }
        }
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
        },
      },
      y: {
        grid: {
          color: "#374151",
          borderDash: [5, 5],
          drawBorder: false,
        },
        ticks: {
          color: "#6B7280",
          callback: (value) => value, // Simplify ticks
        },
        border: {
            display: false
        }
      },
    },
    interaction: {
        mode: 'index',
        intersect: false,
    },
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4, width: "100%", height: 350, p: 3, bgcolor: "#000", borderRadius: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: "#fff" }}>
        Income vs Expenses
      </Typography>
      <Box sx={{ height: 250 }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default IncomeVsExpensesGraph;
