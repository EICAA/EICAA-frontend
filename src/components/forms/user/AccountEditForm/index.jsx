import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { AppContext } from '../../../../storage/context';
import { getLocalStorage } from '../../../../storage/storageHandlers/operations';
import { STORAGE_KEYS } from '../../../../storage/storageHandlers/config';
import { accountEditSchema } from '../../../../utils/validationSchemas';
import { LANGUAGES, PATHS, ROLES } from '../../../../utils/constants';
import { singleValueSelect } from '../../../../utils/selectFieldStyles/singleValueSelect';
import { COUNTRIES } from '../../../../utils/countries';
import Button from '../../../common/ui/Buttons/Button';
import InputTextField from '../../../common/ui/InputTextField';
import SelectField from '../../../common/ui/SelectField';
import './index.scss';

const AccountEditForm = (props) => {
  const { user } = React.useContext(AppContext)[0];
  const { onSubmit } = props;

  const intl = useIntl();
  const navigate = useNavigate();

  const selectedLanguageCode = getLocalStorage(
    STORAGE_KEYS.LANGUAGE || LANGUAGES.EN,
  );

  const initialValues = {
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    organization: user?.organization || '',
    position: user?.position || '',
    country: user?.country ?
      {
        label: COUNTRIES.find(country => user.country === country.alpha2Code).translatedName[selectedLanguageCode],
        value: COUNTRIES.find(country => user.country === country.alpha2Code).translatedName[selectedLanguageCode],
        data: user.country,
      } :
      null,
    role: user?.role ?
      {
        label: user.role,
        value: user.role,
      } : 
      null,
  };
  const countryOptions = COUNTRIES
    .map((country) => ({
      label: country.translatedName[selectedLanguageCode],
      value: country.translatedName[selectedLanguageCode],
      data: country.alpha2Code,
    }))
    .sort((a, b) => {
      if (b.label > a.label) {
        return -1;
      }
      if (b.label < a.label) {
        return 1;
      }
      return 0;
    });
  const roleOptions = Object.values(ROLES).map((value) => ({
    label: value,
    value,
  }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={accountEditSchema(intl)}
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
        <form className="account-edit-form" onSubmit={handleSubmit}>
          <h2 className="account-edit-form__title">
            {intl.messages.user?.accountPage.basicInformation}
          </h2>
          <div className="account-edit-form__container">
            <InputTextField
              className="account-edit-form__input"
              placeholder={intl.messages.common?.firstName}
              label={intl.messages.common?.firstName}
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && errors.firstName}
            />
            <InputTextField
              className="account-edit-form__input"
              placeholder={intl.messages.common?.lastName}
              label={intl.messages.common?.lastName}
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && errors.lastName}
            />
            <SelectField
              className="account-edit-form__select"
              placeholder={intl.messages.common?.country}
              label={intl.messages.common?.country}
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
            <InputTextField
              className="account-edit-form__input"
              placeholder={intl.messages.common?.email}
              label={intl.messages.common?.email}
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <InputTextField
              className="account-edit-form__input"
              placeholder={intl.messages.user?.registerPage.organization}
              label={intl.messages.user?.registerPage.organization}
              name="organization"
              value={values.organization}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.organization && errors.organization}
            />
            <InputTextField
              className="account-edit-form__input"
              placeholder={intl.messages.user?.registerPage.position}
              label={intl.messages.user?.registerPage.position}
              name="position"
              value={values.position}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.position && errors.position}
            />
            <SelectField
              className="account-edit-form__select"
              placeholder={intl.messages.common?.role}
              label={intl.messages.common?.role}
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
            <div className="account-edit-form__button-container">
              <Button
                className="account-edit-form__button -white-bordered"
                label={intl.messages.common?.cancel}
                handleClick={() => navigate(`${PATHS.user}${PATHS.dashboard}`)}
                disabled={isSubmitting}
              />
              <Button
                className="account-edit-form__button"
                label={intl.messages.common?.saveChanges}
                type="submit"
                disabled={
                  isSubmitting ||
                  Object.keys(errors).length ||
                  !Object.keys(touched).length
                }
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AccountEditForm;
