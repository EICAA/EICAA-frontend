import React from 'react';
import * as classnames from 'classnames';
import AssessmentsFilterTreeItem from '../AssessmentsFilterTreeItem';
import './index.scss';

const AssessmentsFilterTree = (props) => {
  const {
    className,
    filteredItems,
    dispatchItems,
    filteredSubItems,
    dispatchSubItems,
    handleSelections,
    selectedSubmissions,
  } = props;

  return (
    <div className={classnames('tree', className && className)}>
      {filteredItems.map((item) => (
        <AssessmentsFilterTreeItem
          className="assessments-filter__tree-item"
          assessmentItem={item}
          key={item.id}
          onClick={handleSelections}
          dispatchItems={dispatchItems}
          subItems={filteredSubItems.filter((subItem) => item.submissionIds.includes(subItem.id))}
          dispatchSubItems={dispatchSubItems}
          selectedSubmissions={selectedSubmissions}
        />
      ))}
    </div>
  );
};

export default AssessmentsFilterTree;
