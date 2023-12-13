import * as React from 'react';
import Select from 'react-select';
import * as classnames from 'classnames';
import ScreenResolver from '../../../common/ScreenResolver';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import './index.scss';

const SelectField = props => {
  const { label, text, className, error, classNamePrefix, id, name, ...other } = props;

  return (
    <div className={classnames('select-field', className)}>
      <div className="select-field__top">
        {
          label &&
            <label className="select-field__label" htmlFor={id || name}>
              {label}
            </label>
        }
        
        {text && <span className="select-field__text">{text}</span>}
        {error ? <div className="select-field__error">{error}</div> : null}
      </div>
      <ScreenResolver
        large={BREAKPOINTS.md}
        desktop={
          <Select
            name={id || name}
            className="select-field__input"
            classNamePrefix={`${error ? 'error ' : ''}select ${classNamePrefix}`}
            blurInputOnSelect={false}
            {...other}
          />
        }
        mobile={
          <Select
            name={id || name}
            className="select-field__input"
            classNamePrefix={`${error ? 'error ' : ''}select ${classNamePrefix}`}
            blurInputOnSelect={false}
            maxMenuHeight={160}
            {...other}
          />
        }
      />
    </div>
  );
};

export default SelectField;
