import axios from "../utils/config/axios.config";

export const login = (email, password) => {
  let body = {
    email,
    password,
  };

  return axios.post("/auth/login", body);
};
