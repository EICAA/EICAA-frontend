import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';
import { convertBooleanStringToBoolean } from '../../../utils/helpers';
import { useLoadingLayer, useShowErrorModal } from '../../../utils/hooks';
import AssessmentCreateForm from '../../forms/user/AssessmentCreateForm';
import { postAssessment } from '../../../api/services/Assessments';
import useSnackBar from '../ui/SnackBar/hooks';
import './index.scss';

const AssessmentEditor = (props) => {
  const { user } = React.useContext(AppContext)[0];

  const { className, assessmentType, setAssessmentData, editorConfig = {} } = props;

  const { title, topColor } = editorConfig;

  const intl = useIntl();
  const snackBar = useSnackBar();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const createAssessment = async (values, { setSubmitting }) => {
    const assessmentValues = {
      userId: user.id,
      assessmentType: assessmentType,
      name: values.name,
      maxParticipants: values.maxParticipants,
      country: values.country.data,
      availableLanguages: values.availableLanguages?.map((language) => language.data),
      activeFrom: values.activeFrom ? new Date(values.activeFrom).toISOString() : values.activeFrom,
      activeTo: values.activeTo ? new Date(values.activeTo).toISOString() : values.activeTo,
      demographics: convertBooleanStringToBoolean(values.demographics),
      shareResults: convertBooleanStringToBoolean(values.shareResults),
    };

    for (const key of Object.keys(assessmentValues)) {
      if (assessmentValues[key] === null || assessmentValues[key] === undefined) {
        delete assessmentValues[key];
      }
    }

    if (assessmentValues.maxParticipants === '') {
      delete assessmentValues.maxParticipants;
    }

    try {
      loadingLayer.show();

      const response = await postAssessment(assessmentValues);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data.data) {
        snackBar.open(intl.messages.snackBars?.assessmentCreated);

        const { id, hash } = data.data;
        setAssessmentData({ ...assessmentValues, id, hash });
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }

    setSubmitting(false);
  };

  return (
    <div className={classnames('assessment-editor', className && className)}>
      <div className="assessment-editor__header">
        <h2 className="assessment-editor__title">{title}</h2>
      </div>
      <div className="assessment-editor__body">
        <div className={classnames('assessment-editor__content', topColor && `-${topColor}-top`)}>
          <AssessmentCreateForm onSubmit={createAssessment} />
        </div>
      </div>
    </div>
  );
};

export default AssessmentEditor;
