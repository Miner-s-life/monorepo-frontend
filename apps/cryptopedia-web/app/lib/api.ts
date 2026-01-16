"use client";

import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling global errors
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // We handle custom error UI locally in components for better context
    return Promise.reject(error);
  }
);
