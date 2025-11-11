import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const loginUser = async (data) => {
  const res = await api.post(API_URLS.AUTH.LOGIN, data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await api.post(API_URLS.AUTH.SIGNUP, data);
  return res.data;
};

export const logoutUser = async () => {
  await api.post(API_URLS.AUTH.LOGOUT);
};