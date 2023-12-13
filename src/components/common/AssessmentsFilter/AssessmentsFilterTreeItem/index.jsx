import React from 'react';
import * as classnames from 'classnames';
import CheckboxIndeterminate from '../../ui/CheckboxIndeterminate';
import AssessmentsFilterTreeSubItem from '../AssessmentsFilterTreeSubItem';
import folderClosedGray from '../../../../assets/icons/folder-closed-gray.svg';
import { EXTENDED_CHECKBOX_STATUSES } from '../../../../utils/constants';
import './index.scss';

const AssessmentsFilterTreeItem = (props) => {
  const { className, assessmentItem, onClick, subItems, selectedSubmissions } = props;

  return (
    <div className={classnames('tree-item', className && className)}>
      <div className="tree-item__assessment-item">
        <CheckboxIndeterminate
          className="tree-item__checkbox"
          name={assessmentItem.id}
          value={assessmentItem.id}
          onChange={() => onClick(assessmentItem.id)}
          checked={assessmentItem.checked}
        />
        <div
          onClick={() => {
            if (assessmentItem.checked !== EXTENDED_CHECKBOX_STATUSES.CHECKED) {
              onClick(assessmentItem.id);
            }
          }}
        >
          <img src={folderClosedGray} alt="folder-icon" />
          {assessmentItem.name}
        </div>
        {subItems.map((submissionItem) => (
          <AssessmentsFilterTreeSubItem
            className="tree-item__sub-item"
            submissionItem={submissionItem}
            key={submissionItem.id}
            onClick={() => {
              selectedSubmissions(submissionItem.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentsFilterTreeItem;
