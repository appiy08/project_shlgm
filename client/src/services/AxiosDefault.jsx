import axios from "axios";
// import { useAuthContext } from "../hooks/auth/useAuthContext";
// End Imports


const serverBaseUrl = import.meta.env.VITE_BASE_URL

const useAxiosDefault = () => {
  // const { user, dispatch } = useAuthContext();

  const handleLogout = (dispatch) => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };

  const AxiosDefault = axios.create({
    baseURL: serverBaseUrl,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  AxiosDefault.interceptors.request.use(
    (config) => {
      const authToken = `Bearer`;
      if (authToken) {
        config.headers.Authorization = authToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  AxiosDefault.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error?.response?.status === 401) {
        handleLogout(() => {});
      }
      return Promise.reject(error);
    },
  );

  return { AxiosDefault };
};

const AxiosDefault = async ({ method, url, data }) => {
  try {
    const { AxiosDefault } = useAxiosDefault();

    return await AxiosDefault({
      method,
      url,
      data,
    });
  } catch (error) {
    console.error("An error occurred in AxiosDefaultSetting:", error);
    throw error;
  }
};

export default AxiosDefault;
