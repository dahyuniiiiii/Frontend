import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACK_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
console.log("[ENV TEST]", import.meta.env.VITE_BACK_API_URL);


export default instance;
