import React from 'react';
import { useIntl } from 'react-intl';
import { EICAA_URL } from '../../../../../utils/constants';
import PageFooter from '../../../../common/PageFooter';
import LandingForm from '../../../../forms/participant/LandingForm';
import './index.scss';

const LandingPageMobile = (props) => {
  const { assessmentData, startAssessment } = props;

  const intl = useIntl();

  return (
    <div className="landing-page-mobile">
      <div className="landing-page-mobile__header">
        <div
          className="landing-page-mobile__logo-eicaa"
          onClick={() => {
            window.open(EICAA_URL, '_blank');
          }}
        />
        <div className="landing-page-mobile__logo-eu" />
      </div>
      <h2
        className="landing-page-mobile__title"
        dangerouslySetInnerHTML={{ __html: intl.messages.participant?.landingPage?.title }}
      />
      <div className="landing-page-mobile__content">
        <p
          className="landing-page-mobile__description"
          dangerouslySetInnerHTML={{ __html: intl.messages.participant?.landingPage?.description }}
        />
        <p className="landing-page-mobile__disclaimer">
          {intl.messages.participant?.landingPage?.disclaimer}
        </p>
        <div className="landing-page-mobile__form-container">
          <LandingForm assessmentData={assessmentData} onSubmit={startAssessment} />
        </div>
      </div>
      <PageFooter />
      <div className="landing-page-mobile__parallelograms" />
    </div>
  );
};

export default LandingPageMobile;
