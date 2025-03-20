import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://mern-typescript-py2d.onrender.com";

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  export default API;