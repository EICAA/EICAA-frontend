import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import Button from '../ui/Buttons/Button';
import './index.scss';

const CdkTypeCard = props => {
  const {
    className,
    title,
    imageUrl,
    topColor,
    handleSelect,
    disabled,
  } = props;

  const intl = useIntl();

  return (
    <div
      className={classnames(
        'cdk-type-card',
        className && className,
      )}
    >
      <div
        className={classnames(
          'cdk-type-card__content',
          topColor && `-${topColor}-top`,
        )}
      >
        <h4 className="cdk-type-card__title">
          {title}
        </h4>
        <img
          className="cdk-type-card__image"
          src={imageUrl}
          alt={title}
        />
        <Button
          className="cdk-type-card__button"
          label={intl.messages.common?.choose}
          handleClick={handleSelect}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CdkTypeCard;
