import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PATHS, QUERY_PARAM_KEYS } from '../../../../utils/constants';
import { getAssessmentEntity } from '../../../../api/services/Assessments';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import AssessmentQRCode from '../../../common/AssessmentQRCode';
import './index.scss';

const AssessmentQRCodePage = () => {
  const [assessmentData, setAssessmentData] = React.useState();

  const searchParams = useSearchParams()[0];
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const assessmentCode = searchParams.get(QUERY_PARAM_KEYS.ASSESSMENT);

  React.useEffect(() => {
    const fetchAssessment = async () => {
      try {
        loadingLayer.show();
        const response = await getAssessmentEntity(assessmentCode);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data.data) {
          setAssessmentData(data.data);
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }
    };

    if (assessmentCode) {
      fetchAssessment();
    }
  }, [loadingLayer, showErrorModal, assessmentCode]);

  const assessmentUrl = React.useMemo(() => {
    const host = window.location.origin;
    return `${host}${PATHS.start}?${QUERY_PARAM_KEYS.ASSESSMENT}=${
      assessmentData?.hash || assessmentData?.id
    }`;
  }, [assessmentData]);

  return (
    <div className="qr-code-page">
      <div className="qr-code-page__container">
        <div className="qr-code-page__header">
          <div className="qr-code-page__logo-eicaa" />
          <div className="qr-code-page__logo-eu" />
        </div>
        <div className="qr-code-page__body">
          <h2 className="qr-code-page__title">{assessmentData?.name}</h2>
          <div className="qr-code-page__content">
            {assessmentData && (
              <AssessmentQRCode
                className="qr-code-page__qr-code"
                url={assessmentUrl}
                assessmentData={assessmentData}
              />
            )}
          </div>
        </div>
        <div className="qr-code-page__parallelograms" />
      </div>
    </div>
  );
};

export default AssessmentQRCodePage;
