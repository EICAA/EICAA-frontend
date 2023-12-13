import React from 'react';
import * as classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

const InputTextField = (props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const {
    label,
    labelFlex,
    name,
    value,
    onChange,
    placeholder = '',
    isRequired,
    type = 'text',
    className,
    tooltip,
    error,
    disabled,
    readOnly,
    ...rest
  } = props;

  const nodeRef = React.useRef(null);

  const [isShowing, toggleShowPass] = React.useState(type !== 'password');

  let inputType = 'text';
  if (type === 'password') {
    inputType = isShowing ? 'text' : 'password';
  }

  if (type === 'number') {
    inputType = 'number';
  }

  return (
    <div className={classnames('input-text-field', className)}>
      <div className={classnames('input-text-field__header', labelFlex && `-flex-${labelFlex}`)}>
        {label && (
          <label
            htmlFor={name}
            className={classnames(
              'input-text-field__label',
              error && 'input-text-field__label-error',
            )}
          >
            {!!isRequired && <span className="input-text-field__star">*</span>}
            {label}
          </label>
        )}
        {tooltip?.iconComponent && tooltip?.text && (
          <div className="input-text-field__tooltip">
            <div
              className="input-text-field__tooltip-icon-container"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {tooltip.iconComponent}
            </div>
            <CSSTransition
              nodeRef={nodeRef}
              in={showTooltip}
              timeout={300}
              classNames="react-transition"
            >
              <div className="input-text-field__tooltip-text" ref={nodeRef}>
                {tooltip.text}
                <div className="input-text-field__tooltip-text-arrow" />
              </div>
            </CSSTransition>
          </div>
        )}
        {error && <div className="input-text-field__error-text">{error}</div>}
      </div>
      <div className="input-text-field__input-wrapper">
        <input
          type={inputType}
          className={classnames(
            'input-text-field__input',
            error && 'input-text-field__input-error',
            readOnly && 'input-text-field__input-read-only',
            type === 'password' && 'input-text-field__input-password',
          )}
          name={name}
          value={value}
          id={name}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />

        {type === 'password' && value && (
          <div className="input-text-field__input-show">
            <svg
              onClick={() => toggleShowPass(!isShowing)}
              className="input-text-field__password-eye"
              width="25"
              height="17"
              viewBox="0 0 25 17"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.9417 8.18756C24.9333 8.16584 24.924 8.14447 24.914 8.12344C23.8053 5.82093 22.08 3.87329 19.9246 2.491C17.71 1.07071 15.1426 0.320068 12.5002 0.320068C9.85767 0.320068 7.29017 1.07082 5.07557 2.49123C2.92808 3.86844 1.20755 5.80707 0.0984612 8.09849C-0.0258364 8.33657 -0.0350779 8.62444 0.0857542 8.87547C1.19427 11.1783 2.91965 13.1263 5.07522 14.5088C7.28994 15.9294 9.85744 16.6801 12.5002 16.6801C15.1428 16.6801 17.7103 15.9294 19.9249 14.5089C22.0804 13.1265 23.8057 11.1787 24.9143 8.87604C25.0181 8.66037 25.0278 8.41074 24.9417 8.18756ZM12.5002 14.9472C8.04311 14.9472 3.90329 12.4302 1.83643 8.49992C3.90329 4.56964 8.04311 2.05273 12.5002 2.05273C16.9571 2.05273 21.097 4.56987 23.1639 8.50003C21.0969 12.43 16.957 14.9472 12.5002 14.9472Z"
                fill={isShowing ? '#D2DB4E' : '#000000'}
              />
              <path
                d="M12.5001 4.69751C10.4035 4.69751 8.69763 6.40337 8.69763 8.50002C8.69763 10.5967 10.4035 12.3025 12.5001 12.3025C14.5968 12.3025 16.3027 10.5967 16.3027 8.50002C16.3027 6.40337 14.5968 4.69751 12.5001 4.69751ZM12.5001 10.5698C11.3589 10.5698 10.4304 9.64123 10.4304 8.50002C10.4304 7.35882 11.3589 6.43028 12.5001 6.43028C13.6413 6.43028 14.5699 7.35882 14.5699 8.50002C14.5699 9.64123 13.6413 10.5698 12.5001 10.5698Z"
                fill={isShowing ? '#D2DB4E' : '#000000'}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputTextField;
