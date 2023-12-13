import React, { useCallback, useMemo, useState } from 'react';

import emailGray from '../../../../assets/icons/email-gray.svg';
import infoIcon from '../../../../assets/icons/info-circle.svg';
import { ResultFields } from '../../../../utils/constants';
import { getAsDatetime } from '../../../../utils/date';
import { objectKeep } from '../../../../utils/lib/youmightnotneed-lodash';
import Checkbox from '../../ui/Checkbox';
import { ResultsActions } from '../reducers';
import ResultInfo from './ResultInfo';
import './index.scss';

const AssessmentsFilterResult = (props) => {
  const {
    assessmentType,
    result,
    results,
    dispatchResults,
    updateAssessmentSelectionState,
    labels,
    values,
  } = props;

  const [isOpen, setOpen] = useState(false);

  const { asDatetime, gender, ageGroup, demographics } = useMemo(() => {
    const { createdAt, gender, ageGroup } = result;

    return {
      asDatetime: getAsDatetime(new Date(createdAt)),
      gender: gender ? gender.substring(0, 1).toUpperCase() : '-',
      ageGroup: ageGroup ? ageGroup.replace('-years', '') : '-',
      demographics: objectKeep(result, [
        ...ResultFields.DEMOGRAPHY_SENSITIVE,
        ...ResultFields.DEMOGRAPHY[assessmentType],
      ]),
    };
  }, [assessmentType, result]);

  const selected = results[result.id];

  const onClick = useCallback(() => {
    dispatchResults({
      type: ResultsActions.SetResultSelection,
      payload: {
        id: result.id,
        selected: !selected,
      },
    });
    updateAssessmentSelectionState(result.id, !selected);
  }, [result, selected, dispatchResults, updateAssessmentSelectionState]);

  const onInfoClick = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  return (
    <div className="assessment-filter-result">
      <div className="assessment-filter-result__content">
        <Checkbox
          className="assessment-filter-result__checkbox"
          name={`result-${result.id}`}
          value={result.id}
          onChange={onClick}
          checked={selected || false}
        />
        <div className="assessment-filter-result__label" onClick={onClick}>
          <img className="email" src={emailGray} alt="email-icon" />
          <span>{`${result.id} | ${asDatetime} (${gender}, ${ageGroup})`}</span>
        </div>
        <img className="info" src={infoIcon} alt="info-icon" onClick={onInfoClick} />
      </div>
      <div className="assessment-filter-result__panel">
        <ResultInfo
          assessmentType={assessmentType}
          demographics={demographics}
          isOpen={isOpen}
          labels={labels}
          values={values}
        />
      </div>
    </div>
  );
};

export default AssessmentsFilterResult;
