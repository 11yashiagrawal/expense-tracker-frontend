"use client";

import { useState, useMemo } from "react";

export const useSubscriptionFilters = (subscriptions) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const ROWS_PER_PAGE = 10;

    const [filters, setFilters] = useState({
        frequency: "All",
        minAmount: 0,
        maxAmount: 10000,
        nextPaymentDate: "",
    });

    const [sort, setSort] = useState({
        field: "nextPaymentDate",
        order: "asc",
    });

    const processedSubscriptions = useMemo(() => {
        let result = Array.isArray(subscriptions) ? [...subscriptions] : [];

        // 1. Search
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((sub) => sub.title.toLowerCase().includes(q));
        }

        // 2. Filters
        if (filters.frequency !== "All") {
            result = result.filter((sub) => sub.frequency === filters.frequency);
        }
        if (filters.nextPaymentDate) {
            const filterDate = new Date(filters.nextPaymentDate)
                .toISOString()
                .split("T")[0];
            result = result.filter((sub) => {
                const subDate = sub.nextPaymentDate
                    ? new Date(sub.nextPaymentDate).toISOString().split("T")[0]
                    : "";
                return subDate === filterDate;
            });
        }
        // Amount range
        result = result.filter(
            (sub) => sub.amount >= filters.minAmount && sub.amount <= filters.maxAmount
        );

        // 3. Sort
        result.sort((a, b) => {
            let valA = a[sort.field];
            let valB = b[sort.field];

            if (sort.field === "nextPaymentDate") {
                valA = new Date(valA || 0).getTime();
                valB = new Date(valB || 0).getTime();
            }

            if (valA < valB) return sort.order === "asc" ? -1 : 1;
            if (valA > valB) return sort.order === "asc" ? 1 : -1;
            return 0;
        });

        return result;
    }, [subscriptions, search, filters, sort]);

    const pageCount = Math.ceil(processedSubscriptions.length / ROWS_PER_PAGE);
    const paginatedSubscriptions = processedSubscriptions.slice(
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
        processedSubscriptions,
        paginatedSubscriptions,
        pageCount,
    };
};
