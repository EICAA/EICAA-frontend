import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { patchUserSelf, putUserSelfPassword } from '../../../../api/services/Users';
import { AppContext } from '../../../../storage/context';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import AccountDeleteBox from '../../../common/AccountDeleteBox';
import MenuBar from '../../../common/MenuBar';
import PageContentHeader from '../../../common/PageContentHeader';
import AccountEditForm from '../../../forms/user/AccountEditForm';
import PasswordChangeForm from '../../../forms/user/PasswordChangeForm';
import './index.scss';

const AccountPage = () => {
  const [{ user }, dispatch] = React.useContext(AppContext);

  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const onSubmitAccountSettings = useCallback(
    async (values, { setSubmitting }) => {
      const accountSettingsUpdate = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        organization: values.organization,
        position: values.position,
        country: values.country.data,
        role: values.role.value,
      };

      try {
        loadingLayer.show();
        const response = await patchUserSelf(accountSettingsUpdate);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data) {
          dispatch({
            type: REDUCER_TYPES.SET_USER,
            user: {
              ...user,
              ...data.data,
            },
          });
          dispatch({
            type: REDUCER_TYPES.SET_MODAL_DATA,
            modalData: {
              intlMessages: intl.messages,
              title: intl.messages.modals?.successfulAccountEditTitle,
              message: intl.messages.modals?.successfulAccountEditMessage,
            },
          });
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }

      setSubmitting(false);
    },
    [dispatch, intl.messages, loadingLayer, showErrorModal, user],
  );

  const onSubmitPasswordChange = useCallback(
    async (values, { setSubmitting }) => {
      const passwordChangeData = {
        ...values,
      };

      try {
        loadingLayer.show();
        const response = await putUserSelfPassword(passwordChangeData);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data) {
          dispatch({
            type: REDUCER_TYPES.SET_MODAL_DATA,
            modalData: {
              intlMessages: intl.messages,
              title: intl.messages.modals?.successfulPasswordChangeTitle,
              message: intl.messages.modals?.successfulPasswordChangeMessage,
            },
          });
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }

      setSubmitting(false);
    },
    [dispatch, intl.messages, loadingLayer, showErrorModal],
  );

  return (
    <div className="account-page">
      <div className="account-page__container">
        <MenuBar />
        <div className="account-page__content">
          <PageContentHeader headerText={intl.messages.user?.accountPage.title} />
          <div className="account-page__body">
            <div className="account-page__body-left">
              <AccountEditForm onSubmit={onSubmitAccountSettings} />
            </div>
            <div className="account-page__body-right">
              <PasswordChangeForm onSubmit={onSubmitPasswordChange} />
              <AccountDeleteBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
