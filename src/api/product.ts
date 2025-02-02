import axios from './axios';

export type Product = {
  _id: string,
  imageB64: string,
  sku: string,
  title: string,
  description: string | null,
}

const baseUrl = "product";

async function get() {
  const result = await axios.get<Product[]>(baseUrl);
  return result.data;
}

async function post(body: Omit<Product, "_id">) {
  const result = await axios.post<boolean>(baseUrl, body);
  return result.data;
}

async function put(body: Product) {
  const result = await axios.put(`${baseUrl}/${body._id}`, body);
  return result.data;
}

async function destroy(_id: string) {
  const result = await axios.delete(`${baseUrl}/${_id}`);
  return result.data;
}

export default {
  baseUrl,
  get,
  post,
  put,
  delete: destroy
}