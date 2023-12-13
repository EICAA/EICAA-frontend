import React from 'react';
import * as classnames from 'classnames';
import StarInput from '../StarInput';
import './index.scss';

const RatingSelector = props => {
  const { className, name, value, onChange, disabled } = props;
  const [starsToHighlight, setStarsToHighlight] = React.useState(0);

  const handleClick = (star) => () => {
    if (!disabled) {
      onChange(star);
    }
  };

  const handleHover = (highlightValue) => () => {
    if (disabled) {
      return;
    }
    setStarsToHighlight(highlightValue);
  };

  return (
    <div
      className={classnames(
        'rating-selector',
        className && className,
      )}
      name={name}
    >
      {[1, 2, 3, 4, 5].map(star => (
        <StarInput
          key={star}
          className="rating-selector__star"
          isActive={star <= value}
          isHighlighted={star <= starsToHighlight}
          onClick={handleClick(star)}
          onMouseEnter={handleHover(star)}
          onMouseLeave={handleHover(0)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default RatingSelector;
