import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const LanguageButton = props => {
  const {
    className,
    imageSrc,
    label,
    selected,
    onChange=()=>{},
  } = props;

  return (
    <div
      className={classnames(
        'language-button',
        className && className,
        selected && '-selected',
      )}
      onClick={onChange}
    >
      <div className="language-button__image-container">
        <img
          className="language-button__image"
          src={imageSrc}
          alt={`flag-${label}`}
        />
      </div>
      <p className="language-button__label">
        {label}
      </p>
    </div>
  );
};

export default LanguageButton;
