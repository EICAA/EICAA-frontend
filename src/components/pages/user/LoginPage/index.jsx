import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import { setLocalStorage } from '../../../../storage/storageHandlers/operations';
import { STORAGE_KEYS } from '../../../../storage/storageHandlers/config';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import { EICAA_URL, PATHS } from '../../../../utils/constants';
import { handleTokenStorage, handleUserStorage } from '../../../../utils/helpers';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import { postLogin } from '../../../../api/services/Auth';
import LoginForm from '../../../forms/user/LoginForm';
import PageFooter from '../../../common/PageFooter';
import ScreenResolver from '../../../common/ScreenResolver';
import backgroundImage from '../../../../assets/images/working-on-laptop.webp';
import './index.scss';

const LoginPage = () => {
  const dispatch = React.useContext(AppContext)[1];

  const navigate = useNavigate();
  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const login = async (values, { setSubmitting }) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    const rememberMe = values.rememberMe;

    try {
      loadingLayer.show();
      const response = await postLogin(loginData);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        const { token, user } = data.data;

        if (user || token) {
          setLocalStorage(STORAGE_KEYS.REMEMBER_LOGIN, rememberMe);
        }

        if (user) {
          dispatch({
            type: REDUCER_TYPES.SET_USER,
            user,
          });
          handleUserStorage.remove();
          handleUserStorage.set(user, rememberMe);
        }

        if (token) {
          dispatch({
            type: REDUCER_TYPES.SET_TOKEN,
            token,
          });
          handleTokenStorage.remove();
          handleTokenStorage.set(token, rememberMe);
          navigate(`${PATHS.user}${PATHS.dashboard}`);
        }
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }

    setSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__content-container">
          <div className="login-page__content">
            <div className="login-page__header">
              <div className="login-page__header-top">
                <div
                  className="login-page__logo-eicaa"
                  onClick={() => {
                    window.open(EICAA_URL, '_blank');
                  }}
                />
                <div className="login-page__logo-eu" />
              </div>
            </div>
            <div className="login-page__body">
              <h2 className="login-page__title">{intl.messages.user?.loginPage.title}</h2>
              <div className="login-page__form-container">
                <LoginForm onSubmit={login} />
              </div>
              <div className="login-page__body-link-container">
                <p className="login-page__sign-up-text">
                  {`${intl.messages.user?.loginPage.signUpText} `}
                  <span
                    className="login-page__sign-up-link"
                    onClick={() => navigate(`${PATHS.user}${PATHS.register}`)}
                  >
                    {intl.messages.user?.loginPage.signUpLink}
                  </span>
                </p>
              </div>
            </div>
            <PageFooter forUser={true} />
          </div>
        </div>
        <ScreenResolver
          large={BREAKPOINTS.lg}
          desktop={
            <div className="login-page__image-container">
              <img className="login-page__image" src={backgroundImage} alt="working-on-laptop" />
              <div className="login-page__parallelograms" />
            </div>
          }
          mobile={null}
        />
      </div>
    </div>
  );
};

export default LoginPage;
