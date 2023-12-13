import React from 'react';
import { useIntl } from 'react-intl';
import { EICAA_URL } from '../../../../../utils/constants';
import LandingForm from '../../../../forms/participant/LandingForm';
import PageFooter from '../../../../common/PageFooter';
import './index.scss';

const LandingPageDesktop = (props) => {
  const { assessmentData, startAssessment } = props;

  const intl = useIntl();

  return (
    <div className="landing-page-desktop">
      <div className="landing-page-desktop__header">
        <div
          className="landing-page-desktop__logo-eicaa"
          onClick={() => {
            window.open(EICAA_URL, '_blank');
          }}
        />
        <div className="landing-page-desktop__logo-eu" />
      </div>
      <div className="landing-page-desktop__body">
        <div className="landing-page-desktop__title-container">
          <h2
            className="landing-page-desktop__title"
            dangerouslySetInnerHTML={{ __html: intl.messages.participant?.landingPage?.title }}
          />
        </div>
        <div className="landing-page-desktop__content-container">
          <div className="landing-page-desktop__content">
            <p
              className="landing-page-desktop__description"
              dangerouslySetInnerHTML={{
                __html: intl.messages.participant?.landingPage?.description,
              }}
            />
            <p className="landing-page-desktop__disclaimer">
              {intl.messages.participant?.landingPage?.disclaimer}
            </p>
            <LandingForm assessmentData={assessmentData} onSubmit={startAssessment} />
            <div className="landing-page-desktop__parallelograms" />
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default LandingPageDesktop;
