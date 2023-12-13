import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const ButtonRectangular = props => {
  const {
    className,
    iconUrl,
    iconHeight,
    tooltipText,
    disabled,
    handleClick=()=>{},
  } = props;

  return (
    <div
      className={classnames(
        'button-rectangular',
        className && className,
        disabled && '-disabled',
      )}
      onClick={handleClick}
      title={tooltipText}
    >
      <img
        className={classnames(
          'button-rectangular__icon',
          iconHeight && `-height-${iconHeight}`,
        )}
        src={iconUrl}
        alt="icon"
      />
    </div>
  );
};

export default ButtonRectangular;
