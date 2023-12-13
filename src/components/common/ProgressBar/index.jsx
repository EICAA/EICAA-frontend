import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const ProgressBar = props => {
  const {
    className,
    percentage,
    width,
  } = props;

  const progressBarElement = React.useRef(null);
  const progressBarProgressElement = React.useRef(null);

  React.useEffect(() => {
    if (width) {
      if (progressBarElement?.current) {
        progressBarElement.current.style.width = width;
      }
    }
  }, [width])

  React.useEffect(() => {
    if (progressBarProgressElement?.current) {
      progressBarProgressElement.current.style.width = `${percentage}%`;
    }
  }, [percentage]);

  return (
    <div
      className={classnames(
        'progress-bar',
        className && className,
      )}
      ref={progressBarElement}
    >
      <div className="progress-bar__percentage">{`${percentage}%`}</div>
      <div className="progress-bar__progress-container">
        <div className="progress-bar__progress" ref={progressBarProgressElement} />
      </div>
    </div>
  );
};

export default ProgressBar;
