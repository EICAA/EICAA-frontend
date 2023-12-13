import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import { useLoadingLayer, useShowErrorModal } from '../../../utils/hooks';
import { PATHS } from '../../../utils/constants';
import { deleteUserSelf } from '../../../api/services/Users';
import Button from '../ui/Buttons/Button';
import './index.scss';

const AccountDeleteBox = props => {
  const dispatch = React.useContext(AppContext)[1];

  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const {
    className,
  } = props;

  const navigate = useNavigate();
  const intl = useIntl();

  const deleteAccount = async () => {
    try {
      loadingLayer.show();
      const response = await deleteUserSelf();
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        dispatch({
          type: REDUCER_TYPES.SET_MODAL_DATA,
          modalData: {
            intlMessages: intl.messages,
            title: intl.messages.modals?.successfulAccountDeleteTitle,
            message: intl.messages.modals?.successfulAccountDeleteMessage,
          },
        });
        navigate(`${PATHS.user}${PATHS.login}`);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  };

  const initiateDeleteAccount = () => {
    dispatch({
      type: REDUCER_TYPES.SET_PROMPT_MODAL_DATA,
      promptModalData: {
        intlMessages: intl.messages,
        title: intl.messages.modals?.deleteRequestWarningTitle,
        message: intl.messages.modals?.deleteRequestWarningMessage,
        acceptHandler: deleteAccount,
        cancelHandler: () => { },
      },
    });
  };

  return (
    <div
      className={classnames(
        'account-delete-box',
        className && className,
      )}
    >
      <h2 className="account-delete-box__title">
        {intl.messages.user?.accountPage.deleteAccount}
      </h2>
      <div className="account-delete-box__content">
        <p className="account-delete-box__message">
          {intl.messages.user?.accountPage.deleteAccountMessage}
        </p>
        <div className="account-delete-box__button-container">
          <Button
            className="account-delete-box__button -red-bordered"
            label={intl.messages.user?.accountPage.deleteAccount}
            handleClick={initiateDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteBox;
