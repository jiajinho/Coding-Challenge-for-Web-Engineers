import axios from "axios";
import user from "./user";
import product from "./product";

export const instance = axios.create({
  baseURL: 'http://localhost:3010',
  timeout: 1000
});

export default {
  user,
  product
}
