import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { passwordForgotSchema } from '../../../../utils/validationSchemas';
import InputTextField from '../../../common/ui/InputTextField';
import Button from '../../../common/ui/Buttons/Button';
import { PATHS } from '../../../../utils/constants';
import './index.scss';

const PasswordForgotForm = (props) => {
  const { onSubmit } = props;

  const navigate = useNavigate();
  const intl = useIntl();

  const initialValues = {
    email: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordForgotSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
        <form className="password-forgot-form" onSubmit={handleSubmit}>
          <InputTextField
            className="password-forgot-form__input"
            placeholder={intl.messages.common?.email}
            name="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
          />
          <div className="password-forgot-form__options-container">
            <p
              className="password-forgot-form__link"
              onClick={() => navigate(`${PATHS.user}${PATHS.login}`)}
            >
              {intl.messages.user?.passwordForgotPage.logIn}
            </p>
          </div>
          <Button
            className='password-forgot-form__button'
            label={intl.messages.user?.passwordForgotPage.submit}
            type='submit'
            onSubmit={handleSubmit}
            disabled={isSubmitting}
          />
        </form>
      )}
    </Formik>
  );
}

export default PasswordForgotForm;
