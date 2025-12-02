"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, useTheme } from "@mui/material";
import { getAllTransactions } from "@/services/transactions";
import * as Icons from "@mui/icons-material";

import { formatDisplayDate } from "@/utils/dateUtils";

const TransactionHistory = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getAllTransactions();
        // API response structure: { data: [...] }
        const allTransactions = response.data || [];
        
        // Sort by date descending
        const sorted = allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Take recent 5
        setTransactions(sorted.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);



  const formatAmount = (amount, type) => {
    const num = parseFloat(amount);
    // Assuming type 'expense' should be negative
    // const isExpense = type === 'expense'; 
    const formatted = num.toFixed(2);
    return formatted;
  };

  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.Category;
    return <IconComponent sx={{ color: "#fff", fontSize: 20 }} />;
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4, width: '100%', maxWidth: '100%' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}>
        Transaction History
      </Typography>
      
      <TableContainer component={Paper} sx={{ 
        backgroundColor: 'transparent', 
        backgroundImage: 'none',
        boxShadow: 'none',
        '& .MuiTableCell-root': {
          borderBottom: 'none',
          color: theme.palette.text.primary
        }
      }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: '#000000', 
              '& th': { 
                color: '#888', 
                fontWeight: 500,
                fontSize: '0.9rem',
                py: 2,
                border: 'none'
              },
              '& th:first-of-type': { borderTopLeftRadius: 20, borderBottomLeftRadius: 20, pl: 4 },
              '& th:last-child': { borderTopRightRadius: 20, borderBottomRightRadius: 20, pr: 4 }
            }}>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Currency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={transaction._id || index} sx={{ 
                backgroundColor: '#0a0a0a',
                '& td': { 
                  py: 1.5, // Reduced padding for half height
                  border: 'none'
                },
                '& td:first-of-type': { borderTopLeftRadius: 20, borderBottomLeftRadius: 20, pl: 4 },
                '& td:last-child': { borderTopRightRadius: 20, borderBottomRightRadius: 20, pr: 4 },
              }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: transaction.category_colour || theme.palette.primary.main,
                      width: 30, 
                      height: 30
                    }}>
                      {getIcon(transaction.category_icon)}
                    </Avatar>
                    <Typography>{transaction.category_title || 'Uncategorized'}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{formatDisplayDate(transaction.date)}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell align="right">{formatAmount(transaction.amount, transaction.type)}</TableCell>
                <TableCell align="right">INR</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionHistory;
