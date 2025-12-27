import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const getCurrentUser = async () => {
  try {
    const res = await api.get(API_URLS.USER.CURRENT_USER);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await api.get(API_URLS.CATEGORIES.GET_ALL_CATEGORIES);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = async (categoryData) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const res = await api.post(API_URLS.CATEGORIES.ADD_CATEGORY, categoryData, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAccountDetails = async (userData) => {
  try {
    const res = await api.patch(API_URLS.USER.UPDATE_ACCOUNT_DETAILS, userData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAvatar = async (formData) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const res = await api.patch(API_URLS.USER.UPDATE_AVATAR, formData, config);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const res = await api.patch(`${API_URLS.CATEGORIES.UPDATE_CATEGORY}${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCategoryIcon = async (id, formData) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const res = await api.patch(`${API_URLS.CATEGORIES.UPDATE_CATEGORY_ICON}${id}`, formData, config);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`${API_URLS.CATEGORIES.DELETE_CATEGORY}${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

