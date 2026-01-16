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
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle common error format: {"error": {"code": "...", "message": "..."}}
      const errorMessage = data?.error?.message || data?.message || "An unexpected error occurred.";

      if (status === 400 || status === 401 || status === 403 || status === 404 || status === 409) {
        toast.error(errorMessage);
      } else if (status >= 500) {
        toast.error("Server error. Please try again later.");
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    }
    
    return Promise.reject(error);
  }
);
