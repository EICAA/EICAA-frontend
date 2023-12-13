import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { loginSchema } from '../../../../utils/validationSchemas';
import InputTextField from '../../../common/ui/InputTextField';
import Button from '../../../common/ui/Buttons/Button';
import Checkbox from '../../../common/ui/Checkbox';
import { PATHS } from '../../../../utils/constants';
import { getLocalStorage } from '../../../../storage/storageHandlers/operations';
import { STORAGE_KEYS } from '../../../../storage/storageHandlers/config';

const LoginForm = (props) => {
  const { onSubmit } = props;

  const navigate = useNavigate();
  const intl = useIntl();

  const initialValues = {
    email: '',
    password: '',
    rememberMe: getLocalStorage(STORAGE_KEYS.REMEMBER_LOGIN) || false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
        <form className="login-page__form" onSubmit={handleSubmit}>
          <InputTextField
            className="login-page__form-input"
            placeholder={intl.messages.common?.email}
            name="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
          />
          <InputTextField
            className="login-page__form-input"
            placeholder={intl.messages.common?.password}
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            error={touched.password && errors.password}
          />
          <div className="login-page__form-options-container">
            <div className="login-page__form-checkbox-container">
              <Checkbox
                className="login-page__form-checkbox"
                name="rememberMe"
                value={values.rememberMe}
                checked={values.rememberMe}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="login-page__form-checkbox-label">
                {intl.messages.user?.loginPage.rememberMe}
              </p>
            </div>
            <p
              className="login-page__form-link"
              onClick={() => navigate(`${PATHS.user}${PATHS.forgotPassword}`)}
            >
              {intl.messages.user?.loginPage.forgotPassword}
            </p>
          </div>
          <Button
              className='login-page__form-button'
              label={intl.messages.user?.loginPage.login}
              type='submit'
              onSubmit={handleSubmit}
              disabled={isSubmitting}
          />
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
