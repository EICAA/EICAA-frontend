import React, { useRef, useEffect } from 'react';
import * as classnames from 'classnames';
import './index.scss';
import { EXTENDED_CHECKBOX_STATUSES } from '../../../../utils/constants';

const CheckboxIndeterminate = (props) => {
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

  const cRef = useRef();

  const indeterminate = React.useMemo(() => {
    return checked === EXTENDED_CHECKBOX_STATUSES.PARTIAL;
  }, [checked]);

  const isChecked = React.useMemo(() => {
    return checked === EXTENDED_CHECKBOX_STATUSES.CHECKED
  }, [checked]);

  useEffect(() => {
    cRef.current.indeterminate = indeterminate;
  }, [cRef, indeterminate]);

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
          checked={isChecked}
          ref={cRef}
          disabled={disabled}
          className="checkbox__input"
          {...rest}
        />
        <span
          className={classnames(
            'checkbox__checkmark',
            disabled && 'checkbox__checkmark_disable',
            indeterminate && 'indeterminate',
          )}
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

export default CheckboxIndeterminate;
