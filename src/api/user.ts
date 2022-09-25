import axios from "./axios";

export type User = {
  _id: string,
  authToken: string,
  username: string,
  email: string
}

const baseUrl = "user";

async function login(email: string, password: string) {
  const result = await axios.post<User>(`${baseUrl}/login`, { email, password });
  return result.data;
}

export default {
  login
}