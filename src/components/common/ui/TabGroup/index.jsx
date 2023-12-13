import React from 'react';
import * as classnames from 'classnames';
import './index.scss';
import { useHorizontalScroll } from '../../../../utils/hooks';

const TabGroup = props => {
  const { className, tabs, style } = props;

  const tabGroupElement = React.useRef();

  useHorizontalScroll(tabGroupElement.current);

  return (
    <section
      ref={tabGroupElement}
      className={classnames(
        'tab-group',
        className && className,
      )}
      style={style}
    >
      {tabs?.map((tab, i) => (
        <button
          key={i}
          className={classnames(
            'tab-group__button',
            tab.className && tab.className,
            tab.isActive && '-active',
          )}
          onClick={tab.onClick}
        >
          {tab.label}
        </button>
      ))}
    </section>
  );
};

export default TabGroup;
