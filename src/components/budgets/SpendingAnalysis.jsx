"use client";

import { useEffect, useState } from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import Loading from "@/components/common/Loading";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getCategoryExpenditure } from "@/services/expenses";
import { formatCurrency } from "@/utils/formatUtils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
);

const SpendingAnalysis = ({ category }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);
    const [stats, setStats] = useState({
        average: 0,
        highest: 0,
        lowest: 0,
    });

    useEffect(() => {
        if (category?._id || category?.categoryId) {
            fetchData();
        }
    }, [category]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth();

            const months = [];
            const promises = [];
            // Generate last 12 months
            for (let i = 11; i >= 0; i--) {
                const d = new Date(currentYear, currentMonth - i, 1);
                const monthName = d.toLocaleString("default", { month: "short" });
                months.push(monthName);
                // Start date: 1st of the month
                const startDate = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
                // End date: last day of the month
                const endDate = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0];

                const id = category._id || category.categoryId;
                promises.push(getCategoryExpenditure(id, startDate, endDate));
            }

            const results = await Promise.all(promises);
            const values = results.map((res) => {
                // res is expected to be { categoryId, categoryName, expenditure } or null
                // console.log(res);
                return res?.data?.expenditure || 0;
            });


            // Calculate stats
            const nonZeroValues = values.filter((v) => v > 0);
            const total = values.reduce((a, b) => a + b, 0);
            const average = nonZeroValues.length ? total / nonZeroValues.length : 0;

            const highest = Math.max(...values);
            const lowest = Math.min(...values.filter(v => v > 0).length ? values.filter(v => v > 0) : [0]);

            setStats({
                average: total / 12,
                highest,
                lowest: lowest === Infinity ? 0 : lowest,
            });

            setChartData({
                labels: months,
                datasets: [
                    {
                        label: "Expenditure",
                        data: values,
                        borderColor: theme.palette.primary.main,
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                            gradient.addColorStop(0, "rgba(20, 162, 72, 0.3)");
                            gradient.addColorStop(1, "rgba(20, 162, 72, 0)");
                            return gradient;
                        },
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: "#000",
                        pointBorderColor: theme.palette.primary.main,
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: theme.palette.primary.main,
                        pointHoverBorderColor: theme.palette.primary.main,
                        pointHoverBorderWidth: 2,
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching spending analysis:", error);
        } finally {
            setLoading(false);
        }
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "rgba(0,0,0,0.8)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "rgba(255,255,255,0.1)",
                borderWidth: 1,
                padding: 10,
                callbacks: {
                    label: (context) => formatCurrency(context.parsed.y),
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
                    color: "#9CA3AF",
                    font: {
                        size: 11,
                    },
                },
                border: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.05)",
                    drawBorder: false,
                },
                ticks: {
                    color: "#9CA3AF",
                    font: {
                        size: 11,
                    },
                    maxTicksLimit: 5,
                    callback: (value) => value, // Simplify ticks
                },
                border: {
                    display: false
                }
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    if (loading) {
        return <Loading height="250px" sx={{ p: 5 }} />;
    }

    if (!chartData) return null;

    return (
        <Paper
            sx={{
                p: 3,
                bgcolor: "#000",
                borderRadius: 6,
                color: "#fff",
                mt: 2
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Spending Analysis
                </Typography>
            </Box>

            <Box sx={{ height: 250, width: "100%" }}>
                <Line data={chartData} options={options} />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, px: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", display: "block", mb: 0.5 }}>
                        Average
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {formatCurrency(stats.average)}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", display: "block", mb: 0.5 }}>
                        Highest
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {formatCurrency(stats.highest)}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", display: "block", mb: 0.5 }}>
                        Lowest
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {formatCurrency(stats.lowest)}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default SpendingAnalysis;
