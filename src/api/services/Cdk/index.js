import axios from 'axios';
import qs from 'qs';
import Paths from '../../../utils/paths';
import { API_URL } from '../../../utils/constants';
import protectedHttp from '../../ProtectedHTTP';

export const getCdkAreas = async (cdkType) => {
  const response = await axios.get(`${API_URL}/${Paths.Cdk.areas(cdkType)}`);

  return response;
};

export const getCdkCompetences = async (cdkType, queryObject = null) => {
  const query = queryObject ? qs.stringify(queryObject) : null;

  const response = await axios.get(
    `${API_URL}/${Paths.Cdk.competences(cdkType)}${query ? `?${query}` : ''}`,
  );

  return response;
};

export const getCdkDifficulties = async (cdkType) => {
  const response = await axios.get(`${API_URL}/${Paths.Cdk.difficulties(cdkType)}`);

  return response;
};

export const getCdkList = async (cdkType, queryObject) => {
  const query = queryObject ? qs.stringify(queryObject) : null;

  const response = await axios.get(
    `${API_URL}/${Paths.Cdk.cdkList(cdkType)}${query ? `?${query}` : ''}`,
  );

  return response;
};

export const getCdkModule = async (cdkType, jsonId) => {
  const response = await axios.get(`${API_URL}/${Paths.Cdk.cdk(cdkType, jsonId)}`);

  return response;
};

export const getCdkModuleRatings = async (cdkType, jsonId) => {
  const response = await axios.get(`${API_URL}/${Paths.Cdk.ratings(cdkType, jsonId)}`);

  return response;
};

export const getCdkModuleRating = async (cdkType, jsonId) => {
  const response = await protectedHttp.get(`${API_URL}/${Paths.Cdk.rating(cdkType, jsonId)}`);

  return response;
};

export const postCdkModuleRating = async (cdkType, jsonId, body) => {
  const response = await protectedHttp.post(
    `${API_URL}/${Paths.Cdk.rating(cdkType, jsonId)}`,
    body,
  );

  return response;
};
