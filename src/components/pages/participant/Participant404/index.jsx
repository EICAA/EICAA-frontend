import React from 'react';
import { useIntl } from 'react-intl';
import './index.scss';

const Participant404 = () => {
  const intl = useIntl();

  return (
    <div className="participant-404">
      <div className="participant-404__container">
        <h2 className="participant-404__title">
          {intl.messages.participant?.['404'].title}
        </h2>
        <p className="participant-404__description">
          {intl.messages.participant?.['404'].description}
        </p>
      </div>
    </div>
  );
};

export default Participant404;
