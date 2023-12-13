import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const DescriptionList = (props) => {
  const { className, description } = props;

  return (
    <ul className={classnames('description-list', className && className)}>
      {description?.map((item, i) => (
        <li key={i} className="description-list__item">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default DescriptionList;
