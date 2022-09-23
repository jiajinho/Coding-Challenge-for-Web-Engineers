import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import user from "./user";
import product from "./product";

export const instance = axios.create({
  baseURL: 'http://localhost:3010',
  timeout: 5000
});

instance.interceptors.response.use((res) => {
  return res;
}, (err: AxiosError) => {
  // const {status, data} = err.response
  const status = err.response?.status;
  const data = err.response?.data;

  if (err.response) {
    toast.error(`${status}: ${data}`);
  } else {
    toast.error(err.message);
  }

  return Promise.reject(err);
});

export default {
  user,
  product
}
