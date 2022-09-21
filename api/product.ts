import { instance as axios } from "api";

async function get() {
  return axios.get("product");
}

export default {
  get
}