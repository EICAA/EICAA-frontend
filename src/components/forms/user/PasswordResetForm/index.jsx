import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { passwordResetSchema } from '../../../../utils/validationSchemas';
import InputTextField from '../../../common/ui/InputTextField';
import Button from '../../../common/ui/Buttons/Button';
import { PATHS } from '../../../../utils/constants';
import './index.scss';

const PasswordResetForm = (props) => {
  const { onSubmit } = props;

  const navigate = useNavigate();
  const intl = useIntl();

  const initialValues = {
    password: '',
    passwordConfirm: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordResetSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
        <form className="password-reset-form" onSubmit={handleSubmit}>
          <InputTextField
            className="password-reset-form__input"
            placeholder={intl.messages.common?.password}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            error={touched.password && errors.password}
          />
          <InputTextField
            className="password-reset-form__input"
            placeholder={intl.messages.common?.passwordConfirm}
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            error={touched.passwordConfirm && errors.passwordConfirm}
          />
          <div className="password-reset-form__options-container">
            <p
              className="password-reset-form__link"
              onClick={() => navigate(`${PATHS.user}${PATHS.login}`)}
            >
              {intl.messages.user?.passwordResetPage.logIn}
            </p>
          </div>
          <Button
            className='password-reset-form__button'
            label={intl.messages.user?.passwordResetPage.submit}
            type='submit'
            onSubmit={handleSubmit}
            disabled={isSubmitting}
          />
        </form>
      )}
    </Formik>
  );
}

export default PasswordResetForm;
