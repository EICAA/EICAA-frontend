import React from 'react';
import { CSSTransition } from 'react-transition-group';
import DatePicker from 'react-date-picker';
import * as classnames from 'classnames';
import './index.scss';

const DateInput = props => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const {
    className,
    label,
    labelFlex,
    name,
    tooltip,
    error,
    errorOnBottom,
    datePickerClassName,
    ...rest
  } = props;

  const nodeRef = React.useRef(null);

  return (
    <div
      className={classnames(
        'date-input',
        className && className,
      )}
    >
      <div
        className={classnames(
          'date-input__top',
          labelFlex && `-flex-${labelFlex}`,
        )}
      >
        {label && (
          <label className="date-input__label" htmlFor={name}>
            {label}
          </label>
        )}
        {tooltip?.iconComponent && tooltip?.text && (
          <div className="date-input__tooltip">
            <div
              className="date-input__tooltip-icon-container"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {tooltip.iconComponent}
            </div>
            <CSSTransition nodeRef={nodeRef} in={showTooltip} timeout={300} classNames="react-transition">
              <div
                className="date-input__tooltip-text"
                ref={nodeRef}
              >
                {tooltip.text}
                <div className="date-input__tooltip-text-arrow" />
              </div>
            </CSSTransition>
          </div>
        )}
        {error && !errorOnBottom ? (
          <div className="date-input__error">{error}</div>
        ) : null}
      </div>
      <DatePicker
        className={datePickerClassName}
        name={name}
        calendarIcon={<div className="date-input__icon-calendar" />}
        {...rest}
      />
      <div className="date-input__bottom">
        {error && errorOnBottom ? (
          <div className="date-input__error -bottom">{error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DateInput;
