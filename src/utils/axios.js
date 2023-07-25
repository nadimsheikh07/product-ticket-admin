import axios from "axios";
// config
import { HOST_API_KEY } from "./config-global";
import { redirect } from "next/navigation";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error && error?.response) {
      const { response } = error;
      if (response?.status === 401) {
        // Router.push(Router.router.asPath);
        redirect("/auth/login");
      }
    }
    return Promise.reject((error && error) || "Something went wrong");
  }
);

export default axiosInstance;
