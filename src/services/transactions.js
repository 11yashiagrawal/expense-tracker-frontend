import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const getAllTransactions = async () => {
    try{
        const res = await api.get(API_URLS.TRANSACTIONS.GET_ALL_TRANSACTIONS);
        return res.data;
    }catch(error){
        console.log(error);
    }
};
