import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const Checkbox = (props) => {
  const {
    label,
    text,
    textElement,
    name,
    onChange,
    error,
    checked,
    className,
    disabled,
    id,
    value,
    unclickable,
    ...rest
  } = props;

  return (
    <div className={classnames('checkbox', className && className, unclickable && '-unclickable')}>
      <div className={classnames('checkbox__error', !error && '-hidden')}>{error}</div>
      <label className={classnames('checkbox__container')} htmlFor={id || name}>
        <input
          id={id || name}
          name={name}
          type="checkbox"
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          className="checkbox__input"
          {...rest}
        />
        <span
          className={classnames('checkbox__checkmark', disabled && 'checkbox__checkmark_disable')}
        />
        <div className="checkbox__text_container">
          {label && <div className="checkbox__label">{label}</div>}
          {text && <div className="checkbox__text">{text}</div>}
          {textElement && textElement}
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
