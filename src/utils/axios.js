import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_Back_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default instance;
