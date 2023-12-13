import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import { EICAA_URL, PATHS, QUERY_PARAM_KEYS } from '../../../../utils/constants';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import { postResetPassword } from '../../../../api/services/Auth';
import PasswordResetForm from '../../../forms/user/PasswordResetForm';
import ScreenResolver from '../../../common/ScreenResolver';
import PageFooter from '../../../common/PageFooter';
import backgroundImage from '../../../../assets/images/working-on-laptop.webp';
import './index.scss';

const PasswordResetPage = () => {
  const dispatch = React.useContext(AppContext)[1];

  const navigate = useNavigate();
  const intl = useIntl();
  const searchParams = useSearchParams()[0];
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const token = searchParams.get(QUERY_PARAM_KEYS.TOKEN);

  const resetPassword = async (values, { setSubmitting }) => {
    const resetData = {
      newPassword: values.password,
      token,
    };

    try {
      loadingLayer.show();
      const response = await postResetPassword(resetData);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        dispatch({
          type: REDUCER_TYPES.SET_MODAL_DATA,
          modalData: {
            intlMessages: intl.messages,
            title: intl.messages.modals?.successTitle,
            message: intl.messages.modals?.resetPasswordMessage,
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
    <div className="password-reset-page">
      <div className="password-reset-page__container">
        <div className="password-reset-page__content-container">
          <div className="password-reset-page__content">
            <div className="password-reset-page__header">
              <div className="password-reset-page__header-top">
                <div
                  className="password-reset-page__logo-eicaa"
                  onClick={() => {
                    window.open(EICAA_URL, '_blank');
                  }}
                />
                <div className="password-reset-page__logo-eu" />
              </div>
            </div>
            <div className="password-reset-page__body">
              <h2 className="password-reset-page__title">
                {intl.messages.user?.passwordResetPage.title}
              </h2>
              <div className="password-reset-page__form-container">
                <PasswordResetForm onSubmit={resetPassword} />
              </div>
              <div className="password-reset-page__body-link-container">
                <p className="password-reset-page__sign-up-text">
                  {`${intl.messages.user?.loginPage.signUpText} `}
                  <span
                    className="password-reset-page__sign-up-link"
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
            <div className="password-reset-page__image-container">
              <img
                className="password-reset-page__image"
                src={backgroundImage}
                alt="working-on-laptop"
              />
              <div className="password-reset-page__parallelograms" />
            </div>
          }
          mobile={null}
        />
      </div>
    </div>
  );
};

export default PasswordResetPage;
