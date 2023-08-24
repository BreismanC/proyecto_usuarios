import axios from "axios";

/**API Test with miragejs */
// const URL_BASE = "api";
const URL_BASE = import.meta.env.VITE_URL_BASE;

export const axiosInstance = axios.create({
  baseURL: URL_BASE,
  timeout: 3000,
  headers: {
    Accept: "*",
  },
});
