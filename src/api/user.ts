import { instance as axios } from 'api';

async function get() {
  return axios.get("user");
}

export default {
  get
}