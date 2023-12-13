import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const RadioButton = props => {
  const { radioClassName, label, value, onChange=()=>{}, ...rest } = props;

  return (
    <div className={classnames(
      'radio-button',
      radioClassName,
    )}>
      <label
        className="radio-button__container"
      >
        {label}
        <input
          className="radio-button__input"
          type="radio"
          onChange={onChange}
          value={value}
          {...rest}
        />
        <span className="radio-button__checkmark"></span>
      </label>
    </div>
  );
};

export default RadioButton;
