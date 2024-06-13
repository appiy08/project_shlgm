import axios from "axios";
import { get } from "lodash";
import { Cookies } from "react-cookie";
import { getCookie } from "../lib/Session";
// End Imports

const serverBaseUrl = import.meta.env.VITE_BASE_URL;

const cookies = new Cookies();

const createAxiosInstance = async () => {
  const auth_credentials = await getCookie('auth_credentials');

  const handleLogout = () => {
    cookies.remove("auth_credentials");
    window.location.replace("/");
  };

  const axiosInstance = axios.create({
    baseURL: serverBaseUrl,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const authToken = `Bearer ${get(auth_credentials, "token", "")}`;
      if (authToken) {
        config.headers.Authorization = authToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error?.response?.status === 401) {
        handleLogout();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const AxiosDefault = async ({ method, url, data }) => {
  try {
    const axiosInstance = await createAxiosInstance();

    return await axiosInstance({
      method,
      url,
      data,
    });
  } catch (error) {
    console.error("An error occurred in AxiosDefault:", error);
    throw error;
  }
};

export default AxiosDefault;
