"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllTransactions } from "@/services/transactions";
import { deleteExpense } from "@/services/expenses";
import { deleteIncome } from "@/services/income";

export const useTransactions = (showNotification) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllTransactions();
            setTransactions(res?.data || []);
        } catch (error) {
            console.error("Failed to fetch transactions", error);
            showNotification("Failed to fetch transactions", "error");
        } finally {
            setLoading(false);
        }
    }, [showNotification]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const removeTransaction = async (id, type) => {
        try {
            if (type === "Expense") {
                await deleteExpense(id);
            } else if (type === "Income") {
                await deleteIncome(id);
            } else {
                showNotification("Cannot delete this transaction type", "warning");
                return false;
            }
            showNotification("Transaction deleted successfully", "success");
            fetchTransactions();
            return true;
        } catch (error) {
            showNotification("Failed to delete transaction", "error");
            return false;
        }
    };

    return {
        transactions,
        loading,
        fetchTransactions,
        removeTransaction,
    };
};
