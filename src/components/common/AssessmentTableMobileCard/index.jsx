import React from 'react';
import * as classnames from 'classnames';
import confusedFaceEmoji from '../../../assets/icons/emoji-confused-face-grey.svg';
import './index.scss';

const AssessmentTableMobileCard = props => {
  const {
    className,
    score,
    title,
    description,
    selected,
    onClick=()=>{},
  } = props;

  return (
    <div 
      className={classnames(
        'assessment-table-mobile-card',
        className && className,
        selected && '-selected',
      )}
      onClick={(() => onClick(score))}
    >
      {title && score !== 0 ? (
        <h4
          className={classnames(
            'assessment-table-mobile-card__title',
            `-score-${score}`
          )}
        >
          {title}
        </h4>
      ) : (
        <img
          className="assessment-table-mobile-card__emoji"
          src={confusedFaceEmoji}
          alt="confused-face"
        />
      )}
      <div className="assessment-table-mobile-card__description">{description}</div>
    </div>
  );
};

export default AssessmentTableMobileCard;
