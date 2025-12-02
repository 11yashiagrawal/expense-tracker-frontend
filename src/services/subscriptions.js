import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const getPaymentsThisMonth = async (startDate, endDate) => {
    try{
        const res = await api.get(
            `${API_URLS.SUBSCRIPTIONS.PAYMENTS_THIS_MONTH}${startDate}/${endDate}`
        );
        return res.data;
    }catch(error){
        console.log(error);
    }
};
