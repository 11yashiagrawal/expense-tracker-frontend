import api from "@/lib/axios";
import { API_URLS } from "@/lib/apiUrls";

export const loginUser = async (data) => {
  try{
    const res = await api.post(API_URLS.AUTH.LOGIN, data);
    return res.data;
  }catch(error){
    console.log(error);
  }
  // console.log(res);
  // if(res?.status!==200 || res?.status!==201)
  //   return res.message
  // else
    return res.data;
};

export const signupUser = async (data) => {
  try{
    const config = data instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
    const res = await api.post(API_URLS.AUTH.SIGNUP, data, config);
    return res.data;
  }catch(error){
    console.log(error);
  }
  // if(res?.status!==200 || res?.status!==201)
  //   return res.message
  // else
    return res.data;
};

export const logoutUser = async () => {
  try{
    const res = await api.post(API_URLS.AUTH.LOGOUT);
    console.log(res);
    return res.data;
  }catch(error){
    console.log(error);
  }
};