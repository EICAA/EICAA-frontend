import * as React from 'react';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { getLocalStorage } from '../../../../storage/storageHandlers/operations';
import { STORAGE_KEYS } from '../../../../storage/storageHandlers/config';
import { LANGUAGES, ROLES } from '../../../../utils/constants';
import { COUNTRIES } from '../../../../utils/countries';
import { preventDefaultEventIfNotLink } from '../../../../utils/helpers';
import { singleValueSelect } from '../../../../utils/selectFieldStyles/singleValueSelect';
import { registerSchema } from '../../../../utils/validationSchemas';
import PrivacyConsent from '../../../common/PrivacyConsent';
import InputTextField from '../../../common/ui/InputTextField';
import SelectField from '../../../common/ui/SelectField';
import Button from '../../../common/ui/Buttons/Button';
import Checkbox from '../../../common/ui/Checkbox';

const roleOptions = Object.keys(ROLES).map((roleKey) => ({
  label: ROLES[roleKey],
  value: ROLES[roleKey],
}));

const RegisterForm = (props) => {
  const { onSubmit } = props;

  const intl = useIntl();

  const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    organization: '',
    position: '',
    country: null,
    role: null,
    consentGiven: false,
  };

  const selectedLanguageCode = getLocalStorage(STORAGE_KEYS.LANGUAGE || LANGUAGES.EN);
  const countryOptions = COUNTRIES.map((country) => ({
    label: country.translatedName[selectedLanguageCode],
    value: country.translatedName[selectedLanguageCode],
    data: country.alpha2Code,
  })).sort((a, b) => {
    if (b.label > a.label) {
      return -1;
    }
    if (b.label < a.label) {
      return 1;
    }
    return 0;
  });

  const createCheckboxtextElement = () => {
    return (
      <div className="checkbox__text" onClick={preventDefaultEventIfNotLink}>
        <PrivacyConsent type="user" />
      </div>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <form className="register-page__form" onSubmit={handleSubmit}>
          <InputTextField
            className="register-page__form-input"
            placeholder={intl.messages.common?.email}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
          <InputTextField
            className="register-page__form-input"
            placeholder={intl.messages.common?.password}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            error={touched.password && errors.password}
          />
          <InputTextField
            className="register-page__form-input"
            placeholder={intl.messages.common?.firstName}
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && errors.firstName}
          />
          <InputTextField
            className="register-page__form-input"
            placeholder={intl.messages.common?.lastName}
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && errors.lastName}
          />
          <InputTextField
            className="register-page__form-input"
            placeholder={intl.messages.user?.registerPage.organization}
            name="organization"
            value={values.organization}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.organization && errors.organization}
          />
          <InputTextField
            className="register-page__form-input"
            placeholder={intl.messages.user?.registerPage.position}
            name="position"
            value={values.position}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.position && errors.position}
          />
          <SelectField
            className="register-page__form-select"
            placeholder={intl.messages.common?.country}
            name="country"
            value={values.country}
            onChange={(country) => setFieldValue('country', country)}
            onBlur={() => setFieldTouched('country', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={countryOptions}
            filterOption={(option, input) =>
              option.value.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.country && errors.country}
          />
          <SelectField
            className="register-page__form-select"
            placeholder={intl.messages.common?.role}
            name="role"
            value={values.role}
            onChange={(role) => setFieldValue('role', role)}
            onBlur={() => setFieldTouched('role', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={roleOptions}
            filterOption={(option, input) =>
              option.value.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.role && errors.role}
          />
          <Checkbox
            className="register-page__form-checkbox"
            name="consentGiven"
            textElement={createCheckboxtextElement()}
            value={values.consentGiven}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.consentGiven && errors.consentGiven}
          />
          <Button
            className="register-page__form-button"
            label={intl.messages.user?.registerPage.registerButton}
            type="submit"
            onSubmit={handleSubmit}
            disabled={isSubmitting || Object.keys(errors).length || !Object.keys(touched).length}
          />
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
