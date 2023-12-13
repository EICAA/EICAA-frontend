import React from 'react';
import * as classnames from 'classnames';
import { capitalize } from '../../../../utils/helpers';
import './index.scss';

const BreadcrumbItem = (props) => {
  const { className, label, color, isLabelCapital } = props;

  return (
    <span
      className={classnames('breadcrumb-item', className && className)}
      style={color ? { background: color } : {}}
    >
      {isLabelCapital ? capitalize(label) : label}
    </span>
  );
};

export default BreadcrumbItem;
