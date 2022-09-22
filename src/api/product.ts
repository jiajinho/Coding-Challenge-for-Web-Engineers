import { instance as axios } from "src/api";

async function get() {
  return axios.get("product");
}

export default {
  get
}