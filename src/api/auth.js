import API from "./axios";

// Signup API
export const signup = (data) => API.post("/auth/signup", data);

// Login API
export const login = (data) => API.post("/auth/login", data);

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
