import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import helpIcon from '../../../../assets/icons/question-mark.svg';
import './index.scss';

const DefaultIconComponent = () => {
  return <img className="radio-button-select__tooltip-icon" src={helpIcon} alt="question-mark" />;
};

const IconWithTooltip = ({ iconComponent, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const nodeRef = useRef(null);

  if (text) {
    return (
      <div className="icon-with-tooltip">
        <div
          className="icon-with-tooltip__icon-container"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {iconComponent ?? <DefaultIconComponent />}
        </div>
        <CSSTransition
          nodeRef={nodeRef}
          in={showTooltip}
          timeout={300}
          classNames="react-transition"
        >
          <div className="icon-with-tooltip__text" ref={nodeRef}>
            {text}
            <div className="icon-with-tooltip__text-arrow" />
          </div>
        </CSSTransition>
      </div>
    );
  }
  return null;
};

export default IconWithTooltip;
