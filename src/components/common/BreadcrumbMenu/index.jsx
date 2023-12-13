import React from 'react';
import * as classnames from 'classnames';
import BreadcrumbItem from '../ui/BreadcrumbItem';
import nextIcon from '../../../assets/icons/next.svg';
import './index.scss';

const BreadcrumbMenu = props => {
  const { className, items } = props;

  return (
    <ul className={classnames(
      'breadcrumb-menu',
      className && className,
    )}>
      {items ? items?.map(({ ...itemProps }, i, array) => (
        <li
          key={i}
          className="breadcrumb-menu__item-container"
        >
          <BreadcrumbItem
            className="breadcrumb-menu__item"
            {...itemProps}
          />
          {i !== array.length - 1 ? (
            <img className="breadcrumb-menu__icon-next" src={nextIcon} alt="next" />
          ) : null}
        </li>
      )) : null}
    </ul>
  );
};

export default BreadcrumbMenu;
