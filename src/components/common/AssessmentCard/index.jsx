import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import ButtonRectangular from '../ui/Buttons/ButtonRectangular';
import { PATHS, QUERY_PARAM_KEYS } from '../../../utils/constants';
import { formatDate } from '../../../utils/helpers';
import { useClipboard, useLoadingLayer, useShowErrorModal } from '../../../utils/hooks';
import { AppContext } from '../../../storage/context';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import { setLocalStorage } from '../../../storage/storageHandlers/operations';
import { STORAGE_KEYS } from '../../../storage/storageHandlers/config';
import { deleteAssessmentEntity, patchAssessmentEntity } from '../../../api/services/Assessments';
import AssessmentActivateForm from '../../forms/user/AssessmentActivateForm';
import useSnackBar from '../ui/SnackBar/hooks';
import pause from '../../../assets/icons/pause.svg';
import play from '../../../assets/icons/play.svg';
import eye from '../../../assets/icons/eye.svg';
import link from '../../../assets/icons/link.svg';
import infoCircle from '../../../assets/icons/info-circle.svg';
import logout from '../../../assets/icons/logout.svg';
import './index.scss';

const AssessmentCard = (props) => {
  const dispatch = React.useContext(AppContext)[1];

  const { className, assessment, archived, reloadList = () => {} } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();
  const clipboard = useClipboard();
  const snackBar = useSnackBar();

  const createdAtDate = new Date(assessment.createdAt) || null;

  const archiveAssessment = useCallback(async () => {
    try {
      loadingLayer.show();

      const response = await patchAssessmentEntity(assessment.id, { archived: true });
      const { status } = response;

      if (status >= 200 && status < 300) {
        reloadList();
        snackBar.open(intl.messages.snackBars?.assessmentArchived);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [intl, reloadList, loadingLayer, showErrorModal, snackBar, assessment.id]);

  const hideModal = useCallback(() => {
    dispatch({ type: REDUCER_TYPES.NULL_MODAL_DATA });
  }, [dispatch]);

  const activateAssessment = useCallback(
    async (values) => {
      try {
        loadingLayer.show();

        const patchData = {
          activeFrom: values.activeFrom
            ? new Date(values.activeFrom).toISOString()
            : values.activeFrom,
          activeTo: values.activeTo ? new Date(values.activeTo).toISOString() : values.activeTo,
          archived: false,
        };

        const response = await patchAssessmentEntity(assessment.id, patchData);
        const { status } = response;

        if (status >= 200 && status < 300) {
          reloadList();
          snackBar.open(intl.messages.snackBars?.assessmentActivated);
        }
        hideModal();
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }
    },
    [intl, reloadList, loadingLayer, showErrorModal, snackBar, assessment.id, hideModal],
  );

  const showActivateAssessmentModal = useCallback(() => {
    dispatch({
      type: REDUCER_TYPES.SET_MODAL_DATA,
      modalData: {
        intlMessages: intl.messages,
        title: intl.messages.modals?.activateAssessmentTitle,
        component: (
          <AssessmentActivateForm
            intlMessages={intl.messages}
            assessment={assessment}
            onSubmit={activateAssessment}
            onCancel={hideModal}
          />
        ),
        hideButtons: true,
      },
    });
  }, [dispatch, intl, activateAssessment, assessment, hideModal]);

  const previewAssessment = useCallback(() => {
    setLocalStorage(STORAGE_KEYS.DRY_RUN_REDIRECT, location.pathname);
    const path = `${PATHS.start}?${QUERY_PARAM_KEYS.ASSESSMENT}=${
      assessment.hash || assessment.id
    }&${QUERY_PARAM_KEYS.DRY_RUN}=true`;

    window.open(path, '_blank');
  }, [assessment]);

  const deleteAssessment = useCallback(async () => {
    try {
      loadingLayer.show();

      const response = await deleteAssessmentEntity(assessment.id);
      const { status } = response;

      if (status >= 200 && status < 300) {
        reloadList();
        snackBar.open(intl.messages.snackBars?.assessmentDeleted);
      }
      hideModal();
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [intl, reloadList, loadingLayer, showErrorModal, snackBar, assessment.id, hideModal]);

  const showDeleteAssessmentModal = useCallback(() => {
    dispatch({
      type: REDUCER_TYPES.SET_PROMPT_MODAL_DATA,
      promptModalData: {
        intlMessages: intl.messages,
        title: intl.messages.modals?.deleteAssessmentWarningTitle,
        message: intl.messages.modals?.deleteAssessmentWarningMessage,
        acceptHandler: deleteAssessment,
        cancelHandler: () => {},
      },
    });
  }, [dispatch, intl, deleteAssessment]);

  return (
    <div className={classnames('assessment-card', className && className)}>
      <div className="assessment-card__header">
        <h3 className="assessment-card__title">{assessment.name}</h3>
      </div>
      <div className="assessment-card__body">
        <p className="assessment-card__data">
          <b className="assessment-card__data -bold">
            {`${intl.messages.user?.assessmentCard.createdOn}: `}
          </b>
          {createdAtDate ? `${formatDate(createdAtDate)}` : '-'}
        </p>
        <p className="assessment-card__data">
          <b className="assessment-card__data -bold">
            {`${intl.messages.user?.assessmentCard.participants}: `}
          </b>
          {`${assessment.participants || 0}/${assessment.maxParticipants || '∞'}`}
        </p>
      </div>
      <div className="assessment-card__footer">
        {archived ? (
          <ButtonRectangular
            className="assessment-card__button"
            iconUrl={play}
            tooltipText={intl.messages.user?.assessmentCard.activate}
            handleClick={showActivateAssessmentModal}
          />
        ) : (
          <ButtonRectangular
            className="assessment-card__button"
            iconUrl={pause}
            iconHeight={17}
            tooltipText={intl.messages.user?.assessmentCard.archive}
            handleClick={archiveAssessment}
          />
        )}
        <ButtonRectangular
          className="assessment-card__button"
          iconUrl={eye}
          tooltipText={intl.messages.user?.assessmentCard.preview}
          handleClick={previewAssessment}
        />
        <ButtonRectangular
          className="assessment-card__button"
          iconUrl={link}
          tooltipText={intl.messages.user?.assessmentCard.copyUrl}
          handleClick={() => clipboard.copyAssessmentUrl(assessment)}
        />
        <ButtonRectangular
          className="assessment-card__button"
          iconUrl={infoCircle}
          tooltipText={intl.messages.user?.assessmentCard.summary}
          handleClick={() => navigate(`${PATHS.user}${PATHS.assessments}/${assessment.id}`)}
        />
        <ButtonRectangular
          className="assessment-card__button"
          iconUrl={logout}
          tooltipText={intl.messages.user?.assessmentCard.delete}
          handleClick={showDeleteAssessmentModal}
        />
      </div>
    </div>
  );
};

export default AssessmentCard;
