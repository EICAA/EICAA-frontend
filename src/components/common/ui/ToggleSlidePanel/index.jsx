import React, { useCallback, useEffect } from 'react';
import * as classnames from 'classnames';

import handleIcon from '../../../../assets/icons/handle.svg';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import { useResolveScreen } from '../../../../utils/hooks';
import './index.scss';

const ToggleSlidePanel = (props) => {
  const {
    children,
    className,
    icon,
    onOpenHideTrigger = false,
    closeOnContentClick = false,
    breakpointUsed = BREAKPOINTS.md,
    isOpen,
    setIsOpen,
    opensFromLeft = true,
  } = props;

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  const screen = useResolveScreen(breakpointUsed);

  useEffect(() => {
    if (screen.isMobile) {
      setIsOpen(false);
    } else if (!screen.isMobile) {
      setIsOpen(true);
    }
  }, [screen.isMobile, setIsOpen]);

  return (
    <aside
      className={classnames(
        'toggle-slide-panel',
        opensFromLeft ? '' : 'right',
        className && className,
        isOpen && '-open',
      )}
      onClick={isOpen && !closeOnContentClick ? null : toggle}
    >
      <div className="toggle-slide-panel__container">
        <div className={classnames('toggle-slide-panel__content', isOpen && '-open')}>
          {children}
        </div>
        <div
          className={classnames('toggle-slide-panel__handle', isOpen && '-open')}
          onClick={toggle}
        >
          <img className="toggle-slide-panel__handle-icon" src={handleIcon} alt="handle" />
        </div>
      </div>
      <div
        className={classnames(
          'toggle-slide-panel__trigger-container',
          onOpenHideTrigger && isOpen && '-open',
        )}
        onClick={toggle}
      >
        <img className="toggle-slide-panel__trigger-icon" src={icon} alt="filters" />
      </div>
    </aside>
  );
};

export default ToggleSlidePanel;
