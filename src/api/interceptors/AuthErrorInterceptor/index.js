import { handleTokenStorage, handleUserStorage } from "../../../utils/helpers";

const authErrorInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },(error) => {
      if (error?.response?.status === 401) {
        handleTokenStorage.remove();
        handleUserStorage.remove();
        window.location.pathname = '/';
      }
    }
  );
};

export default authErrorInterceptor;
