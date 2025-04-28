import axios, { AxiosInstance } from "axios";
import { CreateAxiosInstanceProps } from "models/IChatComponent";

export function createAxiosInstance({
  serverUrl,
  headers,
}: CreateAxiosInstanceProps): AxiosInstance {
  const instance = axios.create({
    baseURL: serverUrl,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  return instance;
}
