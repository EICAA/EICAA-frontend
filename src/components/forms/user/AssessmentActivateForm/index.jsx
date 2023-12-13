import React from 'react';
import { Formik } from 'formik';
import { assessmentActivateSchema } from '../../../../utils/validationSchemas';
import { DATE_LOCALE_PLACEHOLDERS, LANGUAGES } from '../../../../utils/constants';
import { getLocalStorage } from '../../../../storage/storageHandlers/operations';
import { STORAGE_KEYS } from '../../../../storage/storageHandlers/config';
import Button from '../../../common/ui/Buttons/Button';
import DateInput from '../../../common/ui/DateInput';
import helpIcon from '../../../../assets/icons/question-mark.svg';
import './index.scss';

const AssessmentActivateForm = (props) => {
  const { intlMessages, assessment, onSubmit, onCancel } = props;

  const isActiveToPast = new Date(assessment.activeTo) < new Date();
  const initialValues = {
    activeFrom: assessment.activeFrom ? new Date(assessment.activeFrom) : undefined,
    activeTo: assessment.activeTo && !isActiveToPast ? new Date(assessment.activeTo) : undefined,
  };

  const selectedLanguageCode = getLocalStorage(STORAGE_KEYS.LANGUAGE || LANGUAGES.EN);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={assessmentActivateSchema({ messages: intlMessages })}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <form className="assessment-activate-form" onSubmit={handleSubmit}>
          <div className="assessment-activate-form__container">
            <div className="assessment-activate-form__container-part">
              <div className="assessment-activate-form__date-container">
                <DateInput
                  className="assessment-activate-form__date-input"
                  label={`${intlMessages.user?.assessmentCreatePage.startDate}*`}
                  name="activeFrom"
                  value={values.activeFrom}
                  onChange={(date) => {
                    setFieldValue('activeFrom', date);
                  }}
                  onBlur={() => setFieldTouched('activeFrom', true, true)}
                  locale={selectedLanguageCode}
                  dayPlaceholder={DATE_LOCALE_PLACEHOLDERS.DAY[selectedLanguageCode]}
                  monthPlaceholder={DATE_LOCALE_PLACEHOLDERS.MONTH[selectedLanguageCode]}
                  yearPlaceholder={DATE_LOCALE_PLACEHOLDERS.YEAR[selectedLanguageCode]}
                  clearIcon={null}
                  error={touched.activeFrom && errors.activeFrom}
                  errorOnBottom
                />
                <DateInput
                  className="assessment-activate-form__date-input"
                  label={intlMessages.user?.assessmentCreatePage.endDate}
                  name="activeTo"
                  tooltip={{
                    iconComponent: (
                      <img
                        className="radio-button-select__tooltip-icon"
                        src={helpIcon}
                        alt="question-mark"
                      />
                    ),
                    text: intlMessages.user?.assessmentCreatePage.endDateTooltip,
                  }}
                  labelFlex="start-center"
                  value={values.activeTo}
                  onChange={(date) => {
                    setFieldValue('activeTo', date ? new Date(date) : date);
                  }}
                  onBlur={() => setFieldTouched('activeTo', true, true)}
                  locale={selectedLanguageCode}
                  dayPlaceholder={DATE_LOCALE_PLACEHOLDERS.DAY[selectedLanguageCode]}
                  monthPlaceholder={DATE_LOCALE_PLACEHOLDERS.MONTH[selectedLanguageCode]}
                  yearPlaceholder={DATE_LOCALE_PLACEHOLDERS.YEAR[selectedLanguageCode]}
                  error={touched.activeTo && errors.activeTo}
                  errorOnBottom
                />
              </div>
            </div>
          </div>
          <div className="assessment-activate-form__button-container">
            <Button
              className="assessment-activate-form__button -white-bordered"
              label={intlMessages.common?.cancel}
              handleClick={onCancel}
              disabled={isSubmitting}
            />
            <Button
              className="assessment-activate-form__button"
              label={intlMessages.common?.saveChanges}
              type="submit"
              onSubmit={handleSubmit}
              disabled={isSubmitting || Object.keys(errors).length}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AssessmentActivateForm;
