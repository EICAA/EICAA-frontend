import protectedHttp from '../../ProtectedHTTP';
import Paths from '../../../utils/paths';
import { API_URL } from '../../../utils/constants';

export const patchUserSelf = async (body) => {
  const response = await protectedHttp.patch(
    `${API_URL}/${Paths.User.self}`,
    body,
  );

  return response;
};

export const putUserSelfPassword = async (body) => {
  const response = await protectedHttp.put(
    `${API_URL}/${Paths.User.selfPassword}`,
    body,
  );

  return response;
};

export const deleteUserSelf = async () => {
  const response = await protectedHttp.delete(
    `${API_URL}/${Paths.User.self}`,
  );

  return response;
};
