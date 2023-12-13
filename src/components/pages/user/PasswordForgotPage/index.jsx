import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import { EICAA_URL, PATHS } from '../../../../utils/constants';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import { postForgotPassword } from '../../../../api/services/Auth';
import PasswordForgotForm from '../../../forms/user/PasswordForgotForm';
import PageFooter from '../../../common/PageFooter';
import ScreenResolver from '../../../common/ScreenResolver';
import backgroundImage from '../../../../assets/images/working-on-laptop.webp';
import './index.scss';

const PasswordForgotPage = () => {
  const dispatch = React.useContext(AppContext)[1];

  const navigate = useNavigate();
  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const requestRestorationLink = async (values, { setSubmitting }) => {
    const resetData = {
      email: values.email,
    };

    try {
      loadingLayer.show();
      const response = await postForgotPassword(resetData);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        dispatch({
          type: REDUCER_TYPES.SET_MODAL_DATA,
          modalData: {
            intlMessages: intl.messages,
            title: intl.messages.modals?.successTitle,
            message: intl.messages.modals?.forgotPasswordMessage,
          },
        });
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }

    setSubmitting(false);
  };

  return (
    <div className="password-forgot-page">
      <div className="password-forgot-page__container">
        <div className="password-forgot-page__content-container">
          <div className="password-forgot-page__content">
            <div className="password-forgot-page__header">
              <div className="password-forgot-page__header-top">
                <div
                  className="password-forgot-page__logo-eicaa"
                  onClick={() => {
                    window.open(EICAA_URL, '_blank');
                  }}
                />
                <div className="password-forgot-page__logo-eu" />
              </div>
            </div>
            <div className="password-forgot-page__body">
              <h2 className="password-forgot-page__title">
                {intl.messages.user?.passwordForgotPage.title}
              </h2>
              <div className="password-forgot-page__form-container">
                <PasswordForgotForm onSubmit={requestRestorationLink} />
              </div>
              <div className="password-forgot-page__body-link-container">
                <p className="password-forgot-page__sign-up-text">
                  {`${intl.messages.user?.loginPage.signUpText} `}
                  <span
                    className="password-forgot-page__sign-up-link"
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
            <div className="password-forgot-page__image-container">
              <img
                className="password-forgot-page__image"
                src={backgroundImage}
                alt="working-on-laptop"
              />
              <div className="password-forgot-page__parallelograms" />
            </div>
          }
          mobile={null}
        />
      </div>
    </div>
  );
};

export default PasswordForgotPage;
