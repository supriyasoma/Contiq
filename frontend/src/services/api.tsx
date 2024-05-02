import axios, { AxiosInstance } from "axios";

const baseInstance = axios.create({
  baseURL: "https://bc130-be.real-world.tk/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

baseInstance?.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const instance: AxiosInstance = baseInstance;
export default instance;
