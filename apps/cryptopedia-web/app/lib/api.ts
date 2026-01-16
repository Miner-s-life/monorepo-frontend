"use client";

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling token expiration
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle global errors here
    return Promise.reject(error);
  }
);
