"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import ExpensesHeader from "@/components/expenses/ExpensesHeader";
import ExpensesOverview from "@/components/expenses/ExpensesOverview";
import RecentTransactions from "@/components/expenses/RecentTransactions";

export default function Expenses(){
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <ProtectedLayout>
            <Box sx={{ p: 3 }}>
                <ExpensesHeader 
                    selectedDate={selectedDate} 
                    onDateChange={setSelectedDate} 
                />
                <ExpensesOverview selectedDate={selectedDate} />
                <RecentTransactions selectedDate={selectedDate} />
            </Box>
        </ProtectedLayout>
    )
}