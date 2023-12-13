import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const CdkTableCell = props => {
  const { className, text, color } = props;

  return (
    <div
      className={classnames(
        'cdk-table-cell',
        className && className,
      )}
      style={
        color
        ? { background: color }
        : {}
      }
    >
      <p className="cdk-table-cell__text" title={text}>
        {text}
      </p>
    </div>
  );
};

export default CdkTableCell;