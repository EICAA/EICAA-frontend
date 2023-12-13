import axios from "axios";
import authHeaderInterceptor from "../interceptors/AuthHeaderInterceptor";
import authErrorInterceptor from "../interceptors/AuthErrorInterceptor";
import { API_URL } from "../../utils/constants";

const protectedHttp = axios.create({
  baseURL: API_URL,
});

authHeaderInterceptor(protectedHttp);
authErrorInterceptor(protectedHttp);

export default protectedHttp;
