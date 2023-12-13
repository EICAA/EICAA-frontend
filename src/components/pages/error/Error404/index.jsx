import React from 'react';
import { useIntl } from 'react-intl';
import Button from '../../../common/ui/Buttons/Button';
import './index.scss';

const Error404 = () => {
  const intl = useIntl();

  return (
    <div className="error-404">
      <div className="error-404__container">
        <h2 className="error-404__title">
          {intl.messages.error?.['404'].title}
        </h2>
        <p className="error-404__description">
          {intl.messages.error?.['404'].description}
        </p>
        <Button
          className="error-404__button"
          label={intl.messages.common?.back}
          handleClick={() => window.history.go(-1)}
        />
      </div>
    </div>
  );
};

export default Error404;
