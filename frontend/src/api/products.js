import axios from "axios";

const API_URL = "http://localhost:3000";

export const addProduct = async (item) => {
  const response = await axios.post(`${API_URL}/products`, item);

  return response.data;
};

export const giveProduct = async () => {
  const response = await axios.get(`${API_URL}/products`);

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/product/${id}`);

  return response.data;
};

export const editProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);

  return response.data;
};
