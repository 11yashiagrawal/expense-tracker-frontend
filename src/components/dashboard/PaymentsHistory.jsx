"use client";

import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { getPaymentsThisMonth } from "@/services/subscriptions";
import { getMonthDates, formatDisplayDate } from "@/utils/dateUtils";
import { formatCurrency } from "@/utils/formatUtils";

const PaymentsHistory = () => {
  const theme = useTheme();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const { start, end } = getMonthDates(now.getFullYear(), now.getMonth());
        
        const response = await getPaymentsThisMonth(start, end);
        // API response structure: { data: { subscriptions: [...] } }
        const subscriptions = response.data?.subscriptions || [];
        console.log(subscriptions, "from payments history");
        
        // Sort by amount descending and take top 4
        const sorted = subscriptions.sort((a, b) => b.amount - a.amount);
        setPayments(sorted.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch payments data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (payment) => {
  const today = new Date();
  const nextDate = new Date(payment.nextPaymentDate);

  // Determine status
  const status = nextDate <= today ? "paid" : "due";

  // Badge UI config
  const statusConfig = {
    paid: { label: "Paid", color: "#10B981", bgcolor: "rgba(16, 185, 129, 0.1)" },
    due: { label: "Due", color: "#F59E0B", bgcolor: "rgba(245, 158, 11, 0.1)" },
    cancel: { label: "Cancel", color: "#EF4444", bgcolor: "rgba(239, 68, 68, 0.1)" },
  };

  const config = statusConfig[status];

  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,
        borderRadius: 2,
        bgcolor: config.bgcolor,
      }}
    >
      <Typography sx={{ color: config.color, fontSize: "0.75rem", fontWeight: 600 }}>
        {config.label}
      </Typography>
    </Box>
  );
};

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4, width: "100%", height: 350, p: 3, bgcolor: "#000", borderRadius: 4, overflow: "hidden" }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: "#fff" }}>
        Payments History
      </Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {payments.map((payment, index) => (
          <Box 
            key={index}
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "flex-start",
              pb: 2.5,
              borderBottom: index < payments.length - 1 ? "1px solid #1F2937" : "none"
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ color: "#fff", fontWeight: 500, fontSize: "1rem" }}>
                {payment.title}
              </Typography>
              <Typography sx={{ color: "#6B7280", fontSize: "0.875rem", mt: 0.5 }}>
                {formatDisplayDate(payment.nextPaymentDate)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
              <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "1.125rem" }}>
                {formatCurrency(payment.amount)}
              </Typography>
              {getStatusBadge(payment)}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PaymentsHistory;
