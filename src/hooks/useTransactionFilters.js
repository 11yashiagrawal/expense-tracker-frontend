"use client";

import { useState, useMemo } from "react";

export const useTransactionFilters = (transactions) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const ROWS_PER_PAGE = 10;

    const [view, setView] = useState("All");

    const [filters, setFilters] = useState({
        minAmount: 0,
        maxAmount: 1000000,
        date: "",
    });

    const [sort, setSort] = useState({
        field: "date",
        order: "desc",
    });

    const processedTransactions = useMemo(() => {
        let result = Array.isArray(transactions) ? [...transactions] : [];

        // 1. Search (by Title)
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((item) => item.title.toLowerCase().includes(q));
        }

        // 2. View Filter
        if (view !== "All") {
            // Map view to displayed type names (e.g. "expenses" -> "Expense")
            // const viewToType = {
            //     "expenses": "Expense",
            //     "incomes": "Income",
            //     "subscriptions": "Subscription"
            // };
            // const targetType = viewToType[view];
            // if (targetType) {
            //     result = result.filter((item) => item.type === targetType);
            // }
            result = result.filter((item) => item.type === view);
        }
        if (filters.date) {
            result = result.filter((item) => {
                if (!item.date) return false;
                const d = new Date(item.date);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const localDateStr = `${year}-${month}-${day}`;
                return localDateStr === filters.date;
            });
        }

        // Amount range (Treat expenses as positive for filtering)
        result = result.filter(
            (item) => {
                const absAmount = Math.abs(item.amount);
                return absAmount >= filters.minAmount && absAmount <= filters.maxAmount;
            }
        );

        // 3. Sort
        result.sort((a, b) => {
            let valA = a[sort.field];
            let valB = b[sort.field];

            if (sort.field === "date") {
                valA = new Date(valA || 0).getTime();
                valB = new Date(valB || 0).getTime();
            } else if (sort.field === "amount") {
                // Determine sort value (absolute for magnitude?) or actual value?
                // User said "treat it as a positive value for sorting and filtering"
                valA = Math.abs(valA);
                valB = Math.abs(valB);
            }

            if (valA < valB) return sort.order === "asc" ? -1 : 1;
            if (valA > valB) return sort.order === "asc" ? 1 : -1;
            return 0;
        });

        return result;
    }, [transactions, search, filters, sort, view]);

    const pageCount = Math.ceil(processedTransactions.length / ROWS_PER_PAGE);
    const paginatedTransactions = processedTransactions.slice(
        (page - 1) * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    return {
        search,
        setSearch,
        page,
        setPage,
        filters,
        setFilters,
        handleFilterChange,
        sort,
        setSort,
        paginatedTransactions,
        pageCount,
        view,
        setView,
    };
};
