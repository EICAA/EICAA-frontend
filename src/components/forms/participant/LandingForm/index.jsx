import * as React from 'react';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { preventDefaultEventIfNotLink } from '../../../../utils/helpers';
import { landingSchema, landingSchemaNoEmail } from '../../../../utils/validationSchemas';
import PrivacyConsent from '../../../common/PrivacyConsent';
import InputTextField from '../../../common/ui/InputTextField';
import Button from '../../../common/ui/Buttons/Button';
import Checkbox from '../../../common/ui/Checkbox';
import './index.scss';

const LandingForm = (props) => {
  const { onSubmit, assessmentData } = props;

  const intl = useIntl();
  const emailRequired = assessmentData?.emailRequired || false;

  const initialValues = {
    email: '',
    consentGiven: false,
  };

  const createCheckboxtextElement = () => {
    return (
      <div className="checkbox__text" onClick={preventDefaultEventIfNotLink}>
        <PrivacyConsent type="participant" />
      </div>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={emailRequired ? landingSchema(intl) : landingSchemaNoEmail(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({ values, touched, errors, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
        <form className="landing-page-form" onSubmit={handleSubmit}>
          {emailRequired && (
            <InputTextField
              className="landing-page-form__input"
              placeholder={intl.messages.common?.email}
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
          )}
          <Checkbox
            className="landing-page-form__checkbox"
            name="consentGiven"
            textElement={createCheckboxtextElement()}
            value={values.consentGiven}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.consentGiven && errors.consentGiven}
          />
          <Button
            className="landing-page-form__button -primary-light"
            label={intl.messages.common?.start}
            type="submit"
            onSubmit={handleSubmit}
            disabled={isSubmitting || Object.keys(errors)?.length}
          />
        </form>
      )}
    </Formik>
  );
};

export default LandingForm;
