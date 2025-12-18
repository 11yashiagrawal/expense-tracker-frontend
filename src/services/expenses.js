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
    // console.log("Data fetched for:", startDate, "to", endDate);
    return res.data;
  }catch(error){
    console.log(error);
  }
};

export const getCategoryExpenditure = async (categoryId, startDate, endDate) => {
  try{
    const res = await api.get(
      `${API_URLS.EXPENSES.CATEGORY_EXPENDITURE}${categoryId}/${startDate}/${endDate}`
    );
    // console.log("Data fetched for:", categoryId, "from", startDate, "to", endDate);
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

export const deleteExpense = async (id) => {
  try{
    const res = await api.delete(`${API_URLS.EXPENSES.DELETE_EXPENSE}${id}`);
    return res.data;
  }catch(error){
    throw error;
  }
};


export const updateExpense = async (id, expenseData) => {
  try{
    const res = await api.put(`${API_URLS.EXPENSES.UPDATE_EXPENSE}${id}`, expenseData);
    return res.data;
  }catch(error){
    throw error;
  }
};

