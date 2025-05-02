import axios, { AxiosInstance } from "axios";
import { CreateAxiosInstanceProps } from "../models/IChatComponent";

export const createAxiosInstance = ({
  serverUrl,
  headers = {},
}: CreateAxiosInstanceProps): AxiosInstance => {
  const instance = axios.create({
    baseURL: serverUrl,
    headers,
  });

  // 🔁 Request interceptor
  instance.interceptors.request.use(
    (config) => {
      console.log("[Request]", config); // ✅ Useful for debugging
      // You can inject additional headers here if needed
      return config;
    },
    (error) => {
      console.error("[Request Error]", error);
      return Promise.reject(error);
    }
  );

  // 🔁 Response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log("[Response]", response); // ✅ Log or handle success globally
      return response;
    },
    (error) => {
      console.error("[Response Error]", error.response || error.message);
      // You could show toast/alerts or transform error here
      return Promise.reject(error);
    }
  );

  return instance;
};
