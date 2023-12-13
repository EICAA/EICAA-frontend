import React, { Fragment, useMemo } from 'react';
import * as classnames from 'classnames';
import './index.scss';

const ResultInfo = ({ demographics, isOpen, labels, values }) => {
  const labelEntries = useMemo(() => Object.entries(labels || {}), [labels]);

  return (
    <div className={classnames('result-info', isOpen ? 'open' : '')}>
      {labelEntries.map(([key, value]) => {
        return (
          <Fragment key={key}>
            <div className="result-info__separator"></div>
            <div className="result-info__row">
              <span className="label">{value}</span>
              <span className="value">{values[key][demographics[key]]}</span>
            </div>
          </Fragment>
        );
      })}
      <div className="result-info__separator"></div>
    </div>
  );
};

export default ResultInfo;
