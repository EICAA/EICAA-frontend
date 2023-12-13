import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { passwordChangeSchema } from '../../../../utils/validationSchemas';
import Button from '../../../common/ui/Buttons/Button';
import InputTextField from '../../../common/ui/InputTextField';
import './index.scss';
import { PATHS } from '../../../../utils/constants';

const PasswordChangeForm = (props) => {
  const { onSubmit } = props;

  const navigate = useNavigate();
  const intl = useIntl();

  const initialValues = {
    password: '',
    newPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordChangeSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting,
      }) => (
        <form className="password-change-form" onSubmit={handleSubmit}>
          <h2 className="account-edit-form__title">
            {intl.messages.user?.accountPage.changePassword}
          </h2>
          <div className="password-change-form__container">
            <InputTextField
              className="password-change-form__input"
              placeholder={intl.messages.common?.password}
              label={intl.messages.common?.password}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              error={touched.password && errors.password}
            />
            <p
              className="password-change-form__link"
              onClick={() => navigate(`${PATHS.user}${PATHS.forgotPassword}`)}
            >
              {intl.messages.user?.accountPage.forgotPassword}
            </p>
            <InputTextField
              className="password-change-form__input"
              placeholder={intl.messages.user?.accountPage.newPassword}
              label={intl.messages.user?.accountPage.newPassword}
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              error={touched.newPassword && errors.newPassword}
            />
            <div className="password-change-form__button-container">
              <Button
                className="password-change-form__button"
                label={intl.messages.user?.accountPage.updatePassword}
                type="submit"
                onSubmit={handleSubmit}
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

export default PasswordChangeForm;
