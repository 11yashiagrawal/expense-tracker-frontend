import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const addIncome = async (incomeData) => {
  try {
    const res = await api.post(API_URLS.INCOME.ADD_INCOME, incomeData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllIncome = async () => {
  try {
    const res = await api.get(API_URLS.INCOME.GET_ALL_INCOME);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateIncome = async (id, incomeData) => {
  try {
    const res = await api.patch(`${API_URLS.INCOME.UPDATE_INCOME}${id}`, incomeData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIncome = async (id) => {
  try {
    const res = await api.delete(`${API_URLS.INCOME.DELETE_INCOME}${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getIncomeForDates = async (startDate, endDate) => {
  try {
    const res = await api.get(
      `${API_URLS.INCOME.GET_INCOME_FOR_DATES}${startDate}/${endDate}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

