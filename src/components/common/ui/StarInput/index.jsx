import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const StarInput = props => {
  const {
    className,
    isActive,
    isHighlighted,
    onClick=()=>{},
    onMouseEnter=()=>{},
    onMouseLeave=()=>{},
    disabled,
  } = props;

  return (
    <div
      className={classnames(
        'star-input',
        className && className,
        disabled && '-is-disabled',
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={classnames(
          'star-input__star',
          isActive && '-active',
          isHighlighted && '-highlighted',
        )}
      />
    </div>
  );
};

export default StarInput;
