import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';

import './index.scss';

const ConsentPart = ({ intl, type, linkBasePath }) => {
  const messagesRoot = React.useMemo(
    () => intl.messages.gdpr?.consent[`consent-${type}`],
    [intl, type],
  );

  const sectionLink = React.useMemo(() => {
    return `${linkBasePath}${type === 'participant' ? '#section-8' : '#section-7'}`;
  }, [type, linkBasePath]);

  if (!messagesRoot) {
    return null;
  }

  return (
    <div className="privacy-consent__paragraph">
      <span className="privacy-consent__span">{messagesRoot['0']}</span>
      <Link to={sectionLink} target="_blank">
        <span className="privacy-consent__span">{messagesRoot['1']}</span>
      </Link>
      <span className="privacy-consent__span">{messagesRoot['2']}</span>
    </div>
  );
};

const EffectPart = ({ intl, linkBasePath }) => {
  const messagesRoot = React.useMemo(() => intl.messages.gdpr?.consent.effect, [intl]);

  if (!messagesRoot) {
    return null;
  }

  return (
    <div className="privacy-consent__paragraph">
      <span className="privacy-consent__span">{messagesRoot['0']}</span>
      <Link to={`${linkBasePath}#section-1`} target="_blank">
        <span className="privacy-consent__span">{messagesRoot['1']}</span>
      </Link>
      <span className="privacy-consent__span">{messagesRoot['2']}</span>
      <Link to={`${linkBasePath}#section-10`} target="_blank">
        <span className="privacy-consent__span">{messagesRoot['3']}</span>
      </Link>
      <span className="privacy-consent__span">{messagesRoot['4']}</span>
    </div>
  );
};

const PrivacyConsent = ({ type }) => {
  const intl = useIntl();

  const privacyPolicyLinkBasePath =
    type === 'participant' ? PATHS.privacyPolicy : `${PATHS.user}${PATHS.privacyPolicy}`;

  return (
    <div className="privacy-consent">
      <div className="privacy-consent__title">{intl.messages.gdpr?.consent.title}</div>
      <ConsentPart intl={intl} type={type} linkBasePath={privacyPolicyLinkBasePath} />
      <EffectPart intl={intl} linkBasePath={privacyPolicyLinkBasePath} />
    </div>
  );
};

export default PrivacyConsent;
