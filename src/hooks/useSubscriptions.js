"use client";

import { useState, useEffect, useCallback } from "react";
import {
    getAllSubscriptions,
    getPaymentsThisMonth,
    deleteSubscription,
} from "@/services/subscriptions";
import { getMonthDates } from "@/utils/dateUtils";

export const useSubscriptions = (view, showNotification) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscriptions = useCallback(async () => {
        setLoading(true);
        try {
            let data = [];
            if (view === "all") {
                const res = await getAllSubscriptions();
                data = res?.data || [];
            } else {
                const now = new Date();
                const { start, end } = getMonthDates(now.getFullYear(), now.getMonth());
                const res = await getPaymentsThisMonth(start, end);
                data = res?.data || [];
            }
            setSubscriptions(data);
        } catch (error) {
            console.error("Failed to fetch subscriptions", error);
            showNotification("Failed to fetch subscriptions", "error");
        } finally {
            setLoading(false);
        }
    }, [view, showNotification]);

    useEffect(() => {
        fetchSubscriptions();
    }, [fetchSubscriptions]);

    const removeSubscription = async (id) => {
        try {
            await deleteSubscription(id);
            showNotification("Subscription deleted successfully", "success");
            fetchSubscriptions();
            return true;
        } catch (error) {
            showNotification("Failed to delete subscription", "error");
            return false;
        }
    };

    return {
        subscriptions,
        loading,
        fetchSubscriptions,
        removeSubscription,
    };
};
