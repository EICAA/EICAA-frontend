import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { QUERY_PARAM_KEYS } from '../../utils/constants';
import { useLoadingLayer } from '../../utils/hooks';
import { STORAGE_KEYS, PARTICIPANT_ASSESSMENT_KEYS } from './config';
import { getIdb, setIdb } from './operations';

export const useIdbStorageAssessment = () => {
  const searchParams = useSearchParams()[0];
  const loadingLayer = useLoadingLayer();

  const assessmentCode = searchParams.get(QUERY_PARAM_KEYS.ASSESSMENT);

  const get = React.useCallback(async () => {
    let assessments;

    try {
      loadingLayer.show();

      if (typeof assessmentCode !== 'string') {
        throw new Error('IDB storage get error. assessmentCode must be of type string');
      }
      if (!assessmentCode) {
        throw new Error('IDB storage get error. Empty assessmentCode provided');
      }

      assessments = await getIdb(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS);
    } catch (err) {
      console.error(err);
    } finally {
      loadingLayer.hide();
    }

    return (
      assessments?.find((assessmentData) => {
        return assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_CODE] === assessmentCode;
      }) || {}
    );
  }, [loadingLayer, assessmentCode]);

  const getData = React.useCallback(
    async (key) => {
      let assessments;

      try {
        loadingLayer.show();

        if (typeof assessmentCode !== 'string') {
          throw new Error('IDB storage get error. assessmentCode must be of type string');
        }
        if (typeof key !== 'string') {
          throw new Error('IDB storage get error. key must be of type string');
        }
        if (!assessmentCode) {
          throw new Error('IDB storage get error. Empty assessmentCode provided');
        }
        if (!key) {
          throw new Error('IDB storage get error. Empty key provided');
        }

        assessments = await getIdb(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS);
      } catch (err) {
        console.error(err);
      } finally {
        loadingLayer.hide();
      }

      return assessments?.find((assessmentData) => {
        return assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_CODE] === assessmentCode;
      })?.[key];
    },
    [loadingLayer, assessmentCode],
  );

  const setData = React.useCallback(
    async (key, value) => {
      try {
        loadingLayer.show();

        if (typeof assessmentCode !== 'string') {
          throw new Error('IDB storage set error. assessmentCode must be of type string');
        }
        if (typeof key !== 'string') {
          throw new Error('IDB storage set error. key must be of type string');
        }
        if (!assessmentCode) {
          throw new Error('IDB storage set error. Empty assessmentCode provided');
        }
        if (!key) {
          throw new Error('IDB storage set error. Empty key provided');
        }

        const assessments = (await getIdb(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS)) || [];
        const index = assessments
          .map((assessmentData) => assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_CODE])
          .indexOf(assessmentCode);

        if (index === -1) {
          const assessment = {};
          assessment[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_CODE] = assessmentCode;
          assessment[key] = value;
          assessments.push(assessment);
        } else {
          assessments[index][key] = value;
        }

        await setIdb(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS, assessments);
      } catch (err) {
        console.error(err);
      } finally {
        loadingLayer.hide();
      }
    },
    [loadingLayer, assessmentCode],
  );

  const removeData = React.useCallback(
    async (key) => {
      try {
        loadingLayer.show();

        if (typeof assessmentCode !== 'string') {
          throw new Error('IDB storage remove error. assessmentCode must be of type string');
        }
        if (typeof key !== 'string') {
          throw new Error('IDB storage remove error. key must be of type string');
        }
        if (!assessmentCode) {
          throw new Error('IDB storage remove error. Empty assessmentCode provided');
        }
        if (!key) {
          throw new Error('IDB storage remove error. Empty key provided');
        }

        const assessments = (await getIdb(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS)) || [];
        const index = assessments
          .map((assessmentData) => assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_CODE])
          .indexOf(assessmentCode);

        if (index !== -1) {
          delete assessments[index][key];
        }

        await setIdb(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS, assessments);
      } catch (err) {
        console.error(err);
      } finally {
        loadingLayer.hide();
      }
    },
    [loadingLayer, assessmentCode],
  );

  return React.useMemo(
    () => ({ get, getData, setData, removeData }),
    [get, getData, setData, removeData],
  );
};
