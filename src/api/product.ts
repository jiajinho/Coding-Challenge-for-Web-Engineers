import { instance as axios } from "api";

export type Product = {
  id: string,
  title: string,
  image: string,
  description: string
}

async function get() {
  return axios.get("product");
}

export default {
  get
}