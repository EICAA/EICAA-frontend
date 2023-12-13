import React from 'react';
import { useIntl } from 'react-intl';
import { ASSESSMENT_SUMMARY_TYPES } from '../../../../utils/constants';
import { getEditorConfig, getSummaryConfig } from '../../../../utils/helpers';
import AssessmentEditor from '../../../common/AssessmentEditor';
import AssessmentSummary from '../../../common/AssessmentSummary';
import AssessmentTypeSelector from '../../../common/AssessmentTypeSelector';
import MenuBar from '../../../common/MenuBar';
import './index.scss';

const AssessmentCreatePage = () => {
  const [assessmentType, setAssessmentType] = React.useState();
  const [assessmentData, setAssessmentData] = React.useState();
  
  const intl = useIntl();

  return (
    <div className="assessment-create-page">
      <div className="assessment-create-page__container">
        <MenuBar />
        <div className="assessment-create-page__content">
          <div className="assessment-create-page__header">
            <h1 className="assessment-create-page__header-title">
              {intl.messages.user?.assessmentCreatePage.title}
            </h1>
          </div>
          <div className="assessment-create-page__body">
            {assessmentType ? (
              <>
                {assessmentData ? (
                  <AssessmentSummary
                    className="assessment-create-page__summary"
                    assessmentType={assessmentType}
                    assessmentData={assessmentData}
                    handleCreateNew={() => {
                      setAssessmentType(null);
                      setAssessmentData(null);
                    }}
                    summaryConfig={getSummaryConfig(intl, assessmentType, ASSESSMENT_SUMMARY_TYPES.CREATED)}
                  />
                ) : (
                  <AssessmentEditor
                    className="assessment-create-page__editor"
                    assessmentType={assessmentType}
                    setAssessmentData={setAssessmentData}
                    editorConfig={getEditorConfig(intl, assessmentType)}
                  />
                )}
              </>
            ) : (
              <AssessmentTypeSelector
                className="assessment-create-page__type-selector"
                setAssessmentType={setAssessmentType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCreatePage;
