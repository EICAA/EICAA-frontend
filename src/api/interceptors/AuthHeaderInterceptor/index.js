import { handleTokenStorage } from '../../../utils/helpers';

const authHeaderInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (request) => {
      const token = handleTokenStorage.get();
      request.headers["Authorization"] = `Bearer ${token}`;
      return request;
    },
    (error) => {
      console.error(error);
    },
  );
};

export default authHeaderInterceptor;
