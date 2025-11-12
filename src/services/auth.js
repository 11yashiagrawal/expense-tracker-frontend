import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const loginUser = async (data) => {
  const res = await api.post(API_URLS.AUTH.LOGIN, data);
  // console.log(res);
  // if(res?.status!==200 || res?.status!==201)
  //   return res.message
  // else
    return res.data;
};

export const signupUser = async (data) => {
  const config = data instanceof FormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const res = await api.post(API_URLS.AUTH.SIGNUP, data, config);
  // if(res?.status!==200 || res?.status!==201)
  //   return res.message
  // else
    return res.data;
};

export const logoutUser = async () => {
  await api.post(API_URLS.AUTH.LOGOUT);
};