import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const getExpensesForDates = async (startDate, endDate) => {
  try{
    const res = await api.get(
      `${API_URLS.EXPENSES.GET_EXPENSE_FOR_DATES}${startDate}/${endDate}`
    );
    return res.data;
  }catch(error){
    console.log(error);
  }
};

export const getExpenditurePerCategory = async (startDate, endDate) => {
  try{
    const res = await api.get(
      `${API_URLS.EXPENSES.EXPENDITURE_PER_CATEGORY}${startDate}/${endDate}`
    );
    return res.data;
  }catch(error){
    console.log(error);
  }
};

export const addExpense = async (expenseData) => {
  try{
    const res = await api.post(API_URLS.EXPENSES.ADD_EXPENSE, expenseData);
    return res.data;
  }catch(error){
    console.log(error);
  }
};
