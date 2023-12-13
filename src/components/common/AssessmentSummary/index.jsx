import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { setLocalStorage } from '../../../storage/storageHandlers/operations';
import { STORAGE_KEYS } from '../../../storage/storageHandlers/config';
import { ASSESSMENT_SUMMARY_TYPES, PATHS, QUERY_PARAM_KEYS } from '../../../utils/constants';
import Button from '../ui/Buttons/Button';
import { formatDate } from '../../../utils/helpers';
import { useClipboard } from '../../../utils/hooks';
import './index.scss';

const AssessmentSummary = (props) => {
  const { className, assessmentData, handleCreateNew, summaryConfig = {} } = props;

  const { type, subTitle, topColor, subTitleBackgroundColor } = summaryConfig;

  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  const clipboard = useClipboard();

  const assessmentUrl = useMemo(() => {
    const host = window.location.origin;
    return `${host}${PATHS.start}?${QUERY_PARAM_KEYS.ASSESSMENT}=${
      assessmentData.hash || assessmentData.id
    }`;
  }, [assessmentData]);

  const qrCodeUrl = useMemo(() => {
    const host = window.location.origin;
    return `${host}${PATHS.user}${PATHS.qrCode}?${QUERY_PARAM_KEYS.ASSESSMENT}=${assessmentData.id}`;
  }, [assessmentData]);

  const previewAssessment = useCallback(() => {
    setLocalStorage(STORAGE_KEYS.DRY_RUN_REDIRECT, location.pathname);
    const path = `${PATHS.start}?${QUERY_PARAM_KEYS.ASSESSMENT}=${
      assessmentData.hash || assessmentData.id
    }&${QUERY_PARAM_KEYS.DRY_RUN}=true`;

    window.open(path, '_blank');
  }, [assessmentData]);

  const openUrl = (url) => {
    window.open(url, '_blank').focus();
  };

  return (
    <div className={classnames('assessment-summary', className && className)}>
      <div className="assessment-summary__header">
        <h2 className="assessment-summary__title">
          {type === ASSESSMENT_SUMMARY_TYPES.CREATED &&
            intl.messages.user?.assessmentCreatePage.summary}
          {type === ASSESSMENT_SUMMARY_TYPES.OVERVIEW &&
            intl.messages.user?.assessmentCreatePage.overview}
        </h2>
        <p
          className={classnames(
            'assessment-summary__sub-title',
            subTitleBackgroundColor && `-${subTitleBackgroundColor}`,
          )}
        >
          {subTitle}
        </p>
      </div>
      <div className="assessment-summary__body">
        <div className={classnames('assessment-summary__content', topColor && `-${topColor}-top`)}>
          <>
            {assessmentData && (
              <div className="assessment-summary__data-container">
                <h2 className="assessment-summary__data-title">
                  {type === ASSESSMENT_SUMMARY_TYPES.CREATED &&
                    intl.messages.user?.assessmentCreatePage.assessmentCreated}
                  {type === ASSESSMENT_SUMMARY_TYPES.OVERVIEW && intl.messages.common?.assessment}
                </h2>
                <div className="assessment-summary__details">
                  <div className="assessment-summary__row">
                    <p className="assessment-summary__row-title">
                      {intl.messages.user?.assessmentCreatePage.assessmentName}
                    </p>
                    <p className="assessment-summary__row-data">{assessmentData.name}</p>
                  </div>
                  <div className="assessment-summary__row">
                    <p className="assessment-summary__row-title">
                      {intl.messages.user?.assessmentCreatePage.maxParticipants}
                    </p>
                    <p className="assessment-summary__row-data">
                      {assessmentData.maxParticipants || '∞'}
                    </p>
                  </div>
                  <div className="assessment-summary__row">
                    <p className="assessment-summary__row-title">
                      {intl.messages.user?.assessmentCreatePage.startDate}
                    </p>
                    <p className="assessment-summary__row-data">
                      {formatDate(assessmentData.activeFrom)}
                    </p>
                  </div>
                  <div className="assessment-summary__row">
                    <p className="assessment-summary__row-title">
                      {intl.messages.user?.assessmentCreatePage.endDate}
                    </p>
                    <p className="assessment-summary__row-data">
                      {formatDate(assessmentData.activeTo)}
                    </p>
                  </div>
                  <div className="assessment-summary__row">
                    <p className="assessment-summary__row-title">
                      {intl.messages.user?.assessmentCreatePage.participantDemographics}
                    </p>
                    <p className="assessment-summary__row-data">
                      {assessmentData.demographics
                        ? intl.messages.common?.yes
                        : intl.messages.common?.no}
                    </p>
                  </div>
                  <div className="assessment-summary__row">
                    <p className="assessment-summary__row-title">
                      {intl.messages.user?.assessmentCreatePage.shareResults}
                    </p>
                    <p className="assessment-summary__row-data">
                      {assessmentData.shareResults
                        ? intl.messages.common?.yes
                        : intl.messages.common?.no}
                    </p>
                  </div>
                  <div className="assessment-summary__row">
                    <p className="assessment-summary__row-title">
                      {intl.messages.user?.assessmentCreatePage.assessmentLanguages}
                    </p>
                    <p className="assessment-summary__row-data -languages">
                      {assessmentData.availableLanguages?.join(', ') || ''}
                    </p>
                  </div>
                  <div className="assessment-summary__row -url">
                    <p className="assessment-summary__row-title -url">
                      {intl.messages.user?.assessmentCreatePage.assessmentUrl}:&nbsp;
                    </p>
                    <p
                      className="assessment-summary__row-data -url"
                      onClick={() => openUrl(assessmentUrl)}
                    >
                      {assessmentUrl}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="assessment-summary__horizontal-line" />
            <div className="assessment-summary__button-container">
              <Button
                className="assessment-summary__button -white-bordered"
                label={intl.messages.user?.assessmentCreatePage.copyUrl}
                handleClick={() => clipboard.copyAssessmentUrl(assessmentData)}
              />
              <Button
                className="assessment-summary__button -white-bordered"
                label={intl.messages.user?.assessmentCreatePage.qrCode}
                handleClick={() => openUrl(qrCodeUrl)}
              />
              <Button
                className="assessment-summary__button -white-bordered"
                label={intl.messages.user?.assessmentCreatePage.preview}
                handleClick={previewAssessment}
              />
              <Button
                className="assessment-summary__button"
                label={intl.messages.common?.home}
                handleClick={() => navigate(`${PATHS.user}${PATHS.dashboard}`)}
              />
              <Button
                className="assessment-summary__button"
                label={intl.messages.user?.assessmentCreatePage.createNew}
                handleClick={handleCreateNew}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSummary;
