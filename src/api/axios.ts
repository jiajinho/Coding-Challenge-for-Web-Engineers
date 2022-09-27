import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import config from "config";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 1000 * 10 //second
});

instance.interceptors.request.use((req) => {
  const authToken = localStorage.getItem(config.localStorage.key.authToken);

  if (req.headers && authToken) {
    req.headers.Authorization = authToken;
  }

  return req;
})

instance.interceptors.response.use((res) => {
  return res;
}, (err: AxiosError) => {
  const status = err.response?.status;
  const data = err.response?.data;

  if (err.response) {
    toast.error(`${status}: ${data}`);
  } else {
    toast.error(err.message);
  }

  return Promise.reject(err);
});

export default instance;