import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { PATHS, QUERY_PARAM_KEYS } from '../../../utils/constants';
import './index.scss';

const { frequentlyAsked, privacyPolicy, user } = PATHS;

const PageFooter = ({ forUser = false }) => {
  const searchParams = useSearchParams()[0];
  const assessmentCode = searchParams.get(QUERY_PARAM_KEYS.ASSESSMENT);

  const intl = useIntl();
  const faqPath = `${user}${frequentlyAsked}`;
  const privacyPolicyPath = forUser ? `${user}${privacyPolicy}` : `${privacyPolicy}?${QUERY_PARAM_KEYS.ASSESSMENT}=${assessmentCode}`;

  return (
    <div className="page-footer">
      <p className="page-footer__button">
        <Link to={faqPath} target="_blank">
          {intl.messages.common?.faqs}
        </Link>
      </p>
      <p className="page-footer__button">
        <Link to={privacyPolicyPath} target="_blank">
          {intl.messages.common?.privacyPolicy}
        </Link>
      </p>
    </div>
  );
};

export default PageFooter;
