import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import Button from '../ui/Buttons/Button';
import plusCircle from '../../../assets/icons/plus-circle.svg';
import './index.scss';

const PageContentHeader = ({ headerText }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <div className="page-content-header">
      <h1 className="page-content-header__title">{headerText}</h1>
      <Button
        className="page-content-header__button"
        label={intl.messages.user?.dashboardPage.createNewAssessment}
        icon={plusCircle}
        handleClick={() =>
          navigate(`${PATHS.user}${PATHS.assessments}${PATHS.create}`)
        }
      />
    </div>
  );
};

export default PageContentHeader;
