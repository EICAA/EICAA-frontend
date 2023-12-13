import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import { EICAA_URL, PATHS } from '../../../../utils/constants';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import RegisterForm from '../../../forms/user/RegisterForm';
import { postRegister } from '../../../../api/services/Auth';
import ScreenResolver from '../../../common/ScreenResolver';
import backgroundImage from '../../../../assets/images/working-on-laptop.webp'
import './index.scss';

const RegisterPage = () => {
  const dispatch = React.useContext(AppContext)[1];

  const navigate = useNavigate();
  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const register = async (values, { setSubmitting }) => {
    const registerData = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      organization: values.organization,
      position: values.position,
      country: values.country.data,
      role: values.role.value,
      consentGiven: values.consentGiven,
    };

    try {
      loadingLayer.show();
      const response = await postRegister(registerData);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        dispatch({
          type: REDUCER_TYPES.SET_MODAL_DATA,
          modalData: {
            intlMessages: intl.messages,
            title: intl.messages.modals?.successfulRegisterTitle,
            message: intl.messages.modals?.successfulRegisterMessage,
          },
        });
        navigate(`${PATHS.user}${PATHS.login}`);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }

    setSubmitting(false);
  };

  return (
    <div className="register-page">
      <div className="register-page__container">
        <div className="register-page__content-container">
          <div className="register-page__content">
            <div className="register-page__header">
              <div className="register-page__header-top">
                <div
                  className="register-page__logo-eicaa"
                  onClick={() => {
                    window.open(EICAA_URL, '_blank');
                  }}
                />
                <div className="register-page__logo-eu" />
              </div>
            </div>
            <div className="register-page__body">
              <h2 className="register-page__title">{intl.messages.user?.registerPage.title}</h2>
              <div className="register-page__form-container">
                <RegisterForm onSubmit={register} />
              </div>
              <div className="login-page__body-link-container">
                <p className="register-page__sign-in-text">
                  {`${intl.messages.user?.registerPage.signInText} `}
                  <span
                    className="register-page__sign-in-link"
                    onClick={() => navigate(`${PATHS.user}${PATHS.login}`)}
                  >
                    {intl.messages.user?.registerPage.signInLink}
                  </span>
                </p>
              </div>
            </div>
            <div className="register-page__footer">
              <p className="register-page__footer-message">
                {intl.messages.user?.registerPage.footerMessage}
              </p>
            </div>
          </div>
        </div>
        <ScreenResolver
          large={BREAKPOINTS.lg}
          desktop={
            <div className="register-page__image-container">
              <img
                className="register-page__image"
                src={backgroundImage}
                alt="working-on-laptop"
              />
              <div className="register-page__parallelograms" />
            </div>
          }
          mobile={null}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
