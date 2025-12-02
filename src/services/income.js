import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const getIncomeForDates = async (startDate, endDate) => {
  try{
    const res = await api.get(
      `${API_URLS.INCOME.GET_INCOME_FOR_DATES}${startDate}/${endDate}`
    );
    return res.data;
  }catch(error){
    console.log(error);
  }
};

