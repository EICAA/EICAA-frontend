import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { Formik } from 'formik';
import { cdkRatingSchema } from '../../../../utils/validationSchemas';
import RatingSelector from '../../../common/ui/RatingSelector';
import './index.scss';
import FormObserver from '../../../common/FormObserver';

const CdkRatingForm = (props) => {
  const { formRef, className, onSubmit, initialValues, formObserver, disabled } = props;

  const intl = useIntl();

  const { setErrors, setIsSubmitting } = formObserver;

  React.useEffect(() => {
    if (formRef.current) {
      formRef.current.validateForm();
    }
  }, [formRef]);

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={cdkRatingSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({ values, errors, handleSubmit, setFieldValue, isSubmitting }) => (
        <form
          className={classnames('cdk-rating-form', className && className)}
          onSubmit={handleSubmit}
        >
          <FormObserver
            values={values}
            errors={errors}
            isSubmitting={isSubmitting}
            setErrors={setErrors}
            setIsSubmitting={setIsSubmitting}
          />
          <h4 className="cdk-rating-form__title">
            {intl.messages.user?.cdkModulePage.module.ratingHelpfulness}
          </h4>
          <RatingSelector
            className="cdk-rating-form__rating-selector"
            name="helpfulness"
            value={Math.round(values.helpfulness)}
            onChange={(helpfulness) => {
              setFieldValue('helpfulness', helpfulness);
            }}
            disabled={disabled}
          />
          <h4 className="cdk-rating-form__title">
            {intl.messages.user?.cdkModulePage.module.ratingTrainingResults}
          </h4>
          <RatingSelector
            className="cdk-rating-form__rating-selector"
            name="trainingResults"
            value={Math.round(values.trainingResults)}
            onChange={(trainingResults) => {
              setFieldValue('trainingResults', trainingResults);
            }}
            disabled={disabled}
          />
          <h4 className="cdk-rating-form__title">
            {intl.messages.user?.cdkModulePage.module.ratingEaseOfUse}
          </h4>
          <RatingSelector
            className="cdk-rating-form__rating-selector"
            name="easeOfUse"
            value={Math.round(values.easeOfUse)}
            onChange={(easeOfUse) => {
              setFieldValue('easeOfUse', easeOfUse);
            }}
            disabled={disabled}
          />
          <h4 className="cdk-rating-form__title">
            {intl.messages.user?.cdkModulePage.module.ratingInteractivity}
          </h4>
          <RatingSelector
            className="cdk-rating-form__rating-selector"
            name="interactivity"
            value={Math.round(values.interactivity)}
            onChange={(interactivity) => {
              setFieldValue('interactivity', interactivity);
              setErrors(errors);
              setIsSubmitting(isSubmitting);
            }}
            disabled={disabled}
          />
        </form>
      )}
    </Formik>
  );
};

export default CdkRatingForm;
