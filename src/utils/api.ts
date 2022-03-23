import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

// this is temporary. this must be a token from an authenticated user
export const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

// the token required to request a password reset link in Forgot Password Page
export const FORGOT_PASSWORD_TOKEN =
  process.env.REACT_APP_API_CHANGE_PASSWORD_TOKEN;

export const LOGIN_TOKEN =
  process.env.REACT_APP_API_LOGIN_TOKEN;

export const loginAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${LOGIN_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// axios instance for users and content mngt
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// axios instance for forgot password call
export const forgotPasswordAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${FORGOT_PASSWORD_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
