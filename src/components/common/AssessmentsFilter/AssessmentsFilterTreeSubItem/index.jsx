import React from 'react';
import * as classnames from 'classnames';
import Checkbox from '../../ui/Checkbox';
import emailGray from '../../../../assets/icons/email-gray.svg';
import './index.scss';

const AssessmentsFilterTreeSubItem = (props) => {
  const { className, submissionItem, onClick } = props;

  return (
    <div className={classnames('sub-item', className && className)}>
      <div className="sub-item__assessment-item">
        <Checkbox
          className="sub-item__checkbox"
          name={submissionItem.id}
          value={submissionItem.id}
          onChange={() => {
            onClick(submissionItem);
          }}
          checked={submissionItem.checked}
        />
        <div
          onClick={() => {
            onClick(submissionItem);
          }}
        >
          <img src={emailGray} alt="email-icon" />
          {`${submissionItem.id} | ${submissionItem.majorField}`}
        </div>
      </div>
    </div>
  );
};

export default AssessmentsFilterTreeSubItem;
