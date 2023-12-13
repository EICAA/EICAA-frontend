import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PARTICIPANT_ASSESSMENTS_LOCAL_KEYS } from '../../../storage/storageHandlers/config';
import {
  getLocalStorageAssessmentData,
  setLocalStorageAssessmentData,
} from '../../../storage/storageHandlers/utils';
import { QUERY_PARAM_KEYS } from '../../../utils/constants';
import './index.scss';

const AssessmentCounter = props => {
  const { isDryRun } = props;

  const [counter, setCounter] = React.useState();
  const searchParams = useSearchParams()[0];

  const assessmentCode = searchParams.get(QUERY_PARAM_KEYS.ASSESSMENT);

  React.useEffect(() => {
    if (!counter && !isDryRun) {
      const interval = setInterval(() => {
        let currentCount = getLocalStorageAssessmentData(
          assessmentCode,
          PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.DURATION_SECONDS,
        );
  
        if (!currentCount) {
          setLocalStorageAssessmentData(
            assessmentCode,
            PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.DURATION_SECONDS,
            1,
          );
        } else {
          setLocalStorageAssessmentData(
            assessmentCode,
            PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.DURATION_SECONDS,
            currentCount + 1,
          );
        }
      }, 1000);
  
      setCounter(interval);
    }
  }, [counter, assessmentCode, isDryRun]);

  React.useEffect(() => {
    return () => {
      clearInterval(counter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AssessmentCounter;
