import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { getAssessmentEntity } from '../../../../api/services/Assessments';
import { ASSESSMENT_SUMMARY_TYPES, PATHS } from '../../../../utils/constants';
import { getSummaryConfig } from '../../../../utils/helpers';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import AssessmentSummary from '../../../common/AssessmentSummary';
import MenuBar from '../../../common/MenuBar';
import './index.scss';

const AssessmentPage = () => {
  const [assessment, setAssessment] = React.useState();

  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  React.useEffect(() => {
    const fetchAssessment = async () => {
      try {
        loadingLayer.show();
        const response = await getAssessmentEntity(assessmentId);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data.data) {
          setAssessment(data.data);
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }
    };

    if (assessmentId) {
      fetchAssessment();
    }
  }, [loadingLayer, showErrorModal, assessmentId]);

  return (
    <div className="assessment-page">
      <div className="assessment-page__container">
        <MenuBar />
        <div className="assessment-page__content">
          <div className="assessment-page__header">
            <h1 className="assessment-page__header-title">
              {intl.messages.user?.assessmentPage.title}
            </h1>
          </div>
          <div className="assessment-page__body">
            {assessment && (
              <AssessmentSummary
                className="assessment-page__summary"
                assessmentType={assessment.assessmentType}
                assessmentData={assessment}
                handleCreateNew={() => navigate(`${PATHS.user}${PATHS.assessments}${PATHS.create}`)}
                summaryConfig={getSummaryConfig(
                  intl,
                  assessment.assessmentType,
                  ASSESSMENT_SUMMARY_TYPES.OVERVIEW,
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
