import { instance as axios } from "api";

export type Product = {
  id: string,
  title: string,
  image: string,
  description: string
}

const baseUrl = "product";

async function get() {
  return axios.get(baseUrl);
}

async function post() {
  return axios.post(baseUrl, {
    sample: "data"
  });
}

export default {
  get,
  post
}