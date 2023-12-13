import React from 'react';
import * as classnames from 'classnames';
import searchIcon from '../../../../assets/icons/magnifying-glass.svg';
import './index.scss';

const SearchInputTextField = props => {
  const {
    label,
    name,
    value,
    onChange,
    placeholder = '',
    isRequired,
    type = 'text',
    className,
    error,
    disabled,
    readOnly,
    onSubmit=()=>{},
    ...rest
  } = props;

  return (
    <div className={classnames('search-input-text-field', className)}>
      <div className="search-input-text-field__header">
        {label && (
          <label
            htmlFor={name}
            className={classnames(
              'search-input-text-field__label',
              error && 'search-input-text-field__label-error'
            )}
          >
            {!!isRequired && <span className="search-input-text-field__star">*</span>}
            {label}
          </label>
        )}

        {error && <div className="search-input-text-field__error-text">{error}</div>}
      </div>
      <div className="search-input-text-field__input-wrapper">
        <input
          type={type}
          className={classnames(
            'search-input-text-field__input',
            error && 'search-input-text-field__input-error',
            readOnly && 'search-input-text-field__input-read-only',
            type === 'password' && 'search-input-text-field__input-password'
          )}
          name={name}
          value={value}
          id={name}
          onChange={onChange}
          onKeyUp={event => {
            if (event.key === 'Enter') {
              onSubmit();
            }
          }}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
        <div className="search-input-text-field__search">
          <img
            className="search-input-text-field__search-icon"
            src={searchIcon}
            alt="magnifying-glass"
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInputTextField;
