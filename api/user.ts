import { instance as axios } from './index';

async function get() {
  return axios.get("user");
}

export default {
  get
}