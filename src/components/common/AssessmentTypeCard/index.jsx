import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import Button from '../ui/Buttons/Button';
import './index.scss';

const AssessmentTypeCard = props => {
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
        'assessment-type-card',
        className && className,
      )}
    >
      <div
        className={classnames(
          'assessment-type-card__content',
          topColor && `-${topColor}-top`,
        )}
      >
        <h4 className="assessment-type-card__title">
          {title}
        </h4>
        <img
          className="assessment-type-card__image"
          src={imageUrl}
          alt={title}
        />
        <Button
          className="assessment-type-card__button"
          label={intl.messages.common?.choose}
          handleClick={handleSelect}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default AssessmentTypeCard;
