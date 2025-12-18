import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const getPaymentsThisMonth = async (startDate, endDate) => {
    try {
        const res = await api.get(
            `${API_URLS.SUBSCRIPTIONS.PAYMENTS_THIS_MONTH}${startDate}/${endDate}`
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllSubscriptions = async () => {
    try {
        const res = await api.get(API_URLS.SUBSCRIPTIONS.GET_ALL_SUBSCRIPTIONS);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addSubscription = async (subscriptionData) => {
    try {
        const res = await api.post(
            API_URLS.SUBSCRIPTIONS.ADD_SUBSCRIPTION,
            subscriptionData
        );
        return res.data; // Expecting { message, data }
    } catch (error) {
        throw error; // Throw so component can handle
    }
};

export const updateSubscription = async (id, subscriptionData) => {
    try {
        const res = await api.patch(
            `${API_URLS.SUBSCRIPTIONS.UPDATE_SUBSCRIPTION}${id}`,
            subscriptionData
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteSubscription = async (id) => {
    try {
        const res = await api.delete(
            `${API_URLS.SUBSCRIPTIONS.DELETE_SUBSCRIPTION}${id}`
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};
