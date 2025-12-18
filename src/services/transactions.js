import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const getAllTransactions = async () => {
    try {
        const res = await api.get(API_URLS.TRANSACTIONS.GET_ALL_TRANSACTIONS);
        // console.log("transactions fetched in services:", res.data)
        return res.data;
    } catch (error) {
        throw error;
    }
};
