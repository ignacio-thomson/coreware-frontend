import axios from "../utils/config/axios.config";

export const register = (firstName, lastName, age, email, password) => {
  let body = {
    firstName,
    lastName,
    age,
    email,
    password,
  };

  return axios.post("/auth/register", body);
};
