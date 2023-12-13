import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const MenuBarItem = props => {
  const {
    className,
    iconUrl,
    iconUrlActive,
    label,
    active,
    disabled,
    handleClick=()=>{},
  } = props;
  
  return (
    <div
      className={classnames(
        'menu-bar-item',
        className && className,
        active && '-active',
        disabled && '-disabled',
      )}
      onClick={handleClick}
    >
      <div
        className={classnames(
          'menu-bar-item__icon-container',
          active && '-active',
        )}
      >
        <img
          className={classnames(
            'menu-bar-item__icon',
            disabled && '-disabled',
          )}
          src={active ? iconUrlActive : iconUrl}
          alt="icon"
        />
      </div>
      <p
        className={classnames(
          'menu-bar-item__label',
          active && '-active',
          disabled && '-disabled',
        )}
      >
        {label}
      </p>
    </div>
  );
};

export default MenuBarItem;
