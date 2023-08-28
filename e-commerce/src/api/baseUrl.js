import axios from "axios";
import { API_URL } from "../constants/thunkTypes";

const getToken = () => {
  return JSON.parse(localStorage.getItem("userE-com"))?.accessToken || "";
};
const token = getToken();

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  (req) => {
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);
