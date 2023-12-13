import React from 'react';
import { CSSTransition } from "react-transition-group";
import * as classnames from 'classnames';
import RadioButton from '../RadioButton';
import './index.scss';

const RadioButtonSelect = props => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const {
    name,
    label,
    tooltip,
    options = [],
    value,
    className,
    radioClassName,
    onChange=()=>{},
    error,
    ...rest
  } = props;

  const nodeRef = React.useRef(null);

  return (
    <div
      className={classnames(
        'radio-button-select',
        className,
      )}
    >
      <div className={classnames('radio-button-select__label', !label && '-hidden')}>
        {label}
        {tooltip?.iconComponent && tooltip?.text && (
          <div className="radio-button-select__tooltip">
            <div
              className="radio-button-select__tooltip-icon-container"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {tooltip.iconComponent}
            </div>
            <CSSTransition nodeRef={nodeRef} in={showTooltip} timeout={300} classNames="react-transition">
              <div
                className="radio-button-select__tooltip-text"
                ref={nodeRef}
              >
                {tooltip.text}
                <div className="radio-button-select__tooltip-text-arrow" />
              </div>
            </CSSTransition>
          </div>
        )}
      </div>
      <div className={classnames('radio-button-select__error', !error && '-hidden')}>{error}</div>
      <div className={classnames('radio-button-select__button-container')}>
        {options.map((option, i) => (
          <RadioButton
            key={i}
            name={name}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            radioClassName={classnames(
              'radio-button-select__button',
              radioClassName && radioClassName
            )}
            {...rest}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioButtonSelect;
