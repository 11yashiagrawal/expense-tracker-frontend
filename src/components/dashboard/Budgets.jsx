"use client";

import { useState, useEffect } from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { getExpenditurePerCategory } from "@/services/expenses";

import { getMonthDates } from "@/utils/dateUtils";
import { darken } from "@/utils/formatUtils";

const CircularProgressWithLabel = ({ value, color, label, size = 140 }) => {
  const theme = useTheme();
  
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          thickness={3}
          sx={{ color: darken(color) }}
        />
        <CircularProgress
          variant="determinate"
          value={Math.min(value, 100)}
          size={size}
          thickness={3}
          sx={{
            color: color,
            position: 'absolute',
            left: 0,
            [`& .MuiCircularProgress-circle`]: {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 600, color: color }}
          >
            {Math.round(value)}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
        {label}
      </Typography>
    </Box>
  );
};

const Budgets = () => {
  const theme = useTheme();
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const { start, end } = getMonthDates(now.getFullYear(), now.getMonth());
        
        const response = await getExpenditurePerCategory(start, end);
        // API response structure: { data: [...] }
        console.log(response, "from budgets")
        const data = response.data || [];
        
        // Take first 4 items
        setBudgets(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch budget data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}>
        Budgets
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 4,
        justifyItems: 'center'
      }}>
        {budgets.map((item, index) => {
          const percentage = item.budget > 0 ? (item.expenditure / item.budget) * 100 : 0;
          return (
            <CircularProgressWithLabel
              key={index}
              value={percentage}
              color={item.colour || theme.palette.primary.main}
              label={item.categoryName}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Budgets;
