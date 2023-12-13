import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { ASSESSMENT_TYPES } from '../../../utils/constants';
import AssessmentTypeCard from '../AssessmentTypeCard';
import education from '../../../assets/images/education.svg';
import business from '../../../assets/images/business.svg';
import './index.scss';

const AssessmentTypeSelector = (props) => {
  const { className, setAssessmentType } = props;

  const intl = useIntl();

  return (
    <div className={classnames('assessment-type-selector', className && className)}>
      <h2 className="assessment-type-selector__title">
        {intl.messages.user?.assessmentCreatePage.typeSelectorTitle}
      </h2>
      <div className="assessment-type-selector__card-container">
        <AssessmentTypeCard
          className="assessment-type-selector__card"
          title={intl.messages.common?.students}
          imageUrl={education}
          topColor="green"
          handleSelect={() => setAssessmentType(ASSESSMENT_TYPES.STUDENT)}
        />
        <AssessmentTypeCard
          className="assessment-type-selector__card"
          title={intl.messages.common?.employees}
          imageUrl={business}
          topColor="turquoise-lighter"
          handleSelect={() => setAssessmentType(ASSESSMENT_TYPES.EMPLOYEE)}
        />
      </div>
    </div>
  );
};

export default AssessmentTypeSelector;
