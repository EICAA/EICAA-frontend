import axios from "axios";
import Paths from "../../../utils/paths";
import { API_URL } from "../../../utils/constants";

export const postLogin = async (body) => {
  const response = await axios.post(
    `${API_URL}/${Paths.Auth.login}`,
    body,
  );

  return response;
};

export const postRegister = async (body) => {
  const response = await axios.post(
    `${API_URL}/${Paths.Auth.register}`,
    body,
  );

  return response;
};

export const postForgotPassword = async (body) => {
  const response = await axios.post(
    `${API_URL}/${Paths.Auth.forgotPassword}`,
    body,
  );

  return response;
};


export const postResetPassword = async (body) => {
  const response = await axios.post(
    `${API_URL}/${Paths.Auth.resetPassword}`,
    body,
  );

  return response;
};
