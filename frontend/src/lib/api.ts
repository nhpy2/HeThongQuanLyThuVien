import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090/api",
});

//TỰ ĐỘNG GẮN TOKEN
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//HANDLE ERROR GỌN GÀNG
api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err.response?.data || err);
  }
);

export default api;