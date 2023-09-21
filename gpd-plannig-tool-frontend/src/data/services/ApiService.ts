import axios from "axios";

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_LOCAL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export { ApiService };
