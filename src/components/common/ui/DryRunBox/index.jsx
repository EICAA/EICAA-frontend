import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { PATHS } from '../../../../utils/constants';
import { getLocalStorage } from '../../../../storage/storageHandlers/operations';
import Button from '../Buttons/Button';
import './index.scss';
import { STORAGE_KEYS } from '../../../../storage/storageHandlers/config';

const DryRunBox = props => {
  const { className, show } = props;

  const navigate = useNavigate();
  const intl = useIntl();

  const navigateBack = () => {
    const path = getLocalStorage(STORAGE_KEYS.DRY_RUN_REDIRECT) || `${PATHS.user}/${PATHS.dashboard}`;
    
    navigate(path);
  };

  return (
    <div className={classnames(
      'dry-run-box',
      className && className,
      show && '-show',
    )}>
      <p className="dry-run-box__message">
        {intl.messages.common?.preview}
      </p>
      <Button
        label={intl.messages.common?.back}
        className="dry-run-box__button -red-white-bordered"
        handleClick={navigateBack}
      />
    </div>
  );
};

export default DryRunBox;
