import axios from "axios";

export default axios.create({
  baseURL: "https://coreware-backend-production.up.railway.app/api",
  responseType: "json",
  timeout: 60000,
});
