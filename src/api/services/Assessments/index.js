import axios from 'axios';
import qs from 'qs';
import protectedHttp from '../../ProtectedHTTP';
import Paths from '../../../utils/paths';
import { API_URL } from '../../../utils/constants';

export const getAssessment = async (assessmentCode) => {
  const response = await axios.get(
    `${API_URL}/${Paths.ParticipantAssessment.assessment}/${assessmentCode}`,
  );

  return response;
};

export const getAssessmentQuestions = async (assessmentType, languageCode) => {
  const response = await axios.get(
    `${API_URL}/${Paths.ParticipantAssessment.assessmentQuestions}/${assessmentType}/${languageCode}`,
  );

  return response;
};

export const postAssessmentAnswers = async (assessmentCode, body) => {
  const response = await axios.post(
    `${API_URL}/${Paths.ParticipantAssessment.assessment}/${assessmentCode}/result`,
    body,
  );

  return response;
};

export const postFeedback = async (assessmentCode, resultToken, body) => {
  const response = await axios.post(
    `${API_URL}/${Paths.ParticipantAssessment.assessment}/${assessmentCode}/result/${resultToken}/feedback`,
    body,
  );

  return response;
};

export const deleteResults = async (assessmentCode, resultToken) => {
  const response = await axios.delete(
    `${API_URL}/${Paths.ParticipantAssessment.assessment}/${assessmentCode}/result/${resultToken}`,
  );

  return response;
};

export const getAssessmentEntity = async (assessmentId) => {
  const response = await protectedHttp.get(
    `${API_URL}/${Paths.UserAssessment.assessment}/${assessmentId}`,
  );

  return response;
};

export const patchAssessmentEntity = async (assessmentId, body) => {
  const response = await protectedHttp.patch(
    `${API_URL}/${Paths.UserAssessment.assessment}/${assessmentId}`,
    body,
  );

  return response;
};

export const deleteAssessmentEntity = async (assessmentId) => {
  const response = await protectedHttp.delete(
    `${API_URL}/${Paths.UserAssessment.assessment}/${assessmentId}`,
  );

  return response;
};

export const getAssessmentHelpCsvFile = async (assessmentType) => {
  const response = await protectedHttp.get(
    `${API_URL}/${Paths.UserAssessment.assessmentsHelp}/${assessmentType}`,
    { responseType: 'blob' },
  );

  return response;
};

export const getAssessmentResults = async (assessmentId, queryObject) => {
  const query = queryObject ? qs.stringify(queryObject) : null;

  const response = await protectedHttp.get(
    `${API_URL}/${Paths.UserAssessment.assessment}/${assessmentId}/results${
      query ? `?${query}` : ''
    }`,
  );

  return response;
};

export const getAssessmentList = async (queryObject) => {
  const query = queryObject ? qs.stringify(queryObject) : null;

  const response = await protectedHttp.get(
    `${API_URL}/${Paths.UserAssessment.assessment}${query ? `?${query}` : ''}`,
  );

  return response;
};

export const getAssessmentListWithRecentResults = async (queryObject) => {
  const query = queryObject ? qs.stringify(queryObject) : null;

  const response = await protectedHttp.get(
    `${API_URL}/${Paths.UserAssessment.assessmentsRecent}${query ? `?${query}` : ''}`,
  );

  return response;
};

export const postAssessmentsRecentResults = async (assessmentIds, days) => {
  const response = await protectedHttp.post(
    `${API_URL}/${Paths.UserAssessment.assessmentIdsRecentResults}`,
    { assessmentIds, days },
  );

  return response;
};

export const postAssessment = async (body) => {
  const response = await protectedHttp.post(`${API_URL}/${Paths.UserAssessment.assessment}`, body);

  return response;
};

export const postAssessmentsResultsFiltered = async (body) => {
  const response = await protectedHttp.post(
    `${API_URL}/${Paths.UserAssessment.assessmentsFiltered}`,
    body,
  );

  return response;
};

export const postAssessmentsResultsFilteredFormat = async (body, format) => {
  const response = await protectedHttp.post(
    `${API_URL}/${Paths.UserAssessment.assessmentsFiltered}/${format}`,
    body,
    { responseType: 'blob' },
  );

  return response;
};

// File downloads

const getAssessmentResultsAsBlob = async (assessmentId, queryObject = {}) => {
  const query = queryObject ? qs.stringify(queryObject) : null;

  const response = await protectedHttp.get(
    `${API_URL}/${Paths.UserAssessment.assessment}/${assessmentId}/results?${query}`,
    { responseType: 'blob' },
  );

  return response;
};

export const getAssessmentResultsAsXlsx = async (assessmentId) => {
  return getAssessmentResultsAsBlob(assessmentId, { asXlsx: true });
};

export const getAssessmentResultsAsCsv = async (assessmentId) => {
  return getAssessmentResultsAsBlob(assessmentId, { asCsv: true });
};

// Unused, kept for reference

/* export const getAssessmentRecentResults = async (assessmentId, queryObject) => {
  const query = queryObject ? qs.stringify(queryObject) : null;

  const response = await protectedHttp.get(
    `${API_URL}/${Paths.UserAssessment.assessmentIdRecentResults(assessmentId)}${
      query ? `?${query}` : ''
    }`,
  );

  return response;
}; */
