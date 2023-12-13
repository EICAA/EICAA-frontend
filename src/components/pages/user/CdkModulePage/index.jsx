import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { useIntl } from 'react-intl';
import qs from 'qs';
import { PATHS } from '../../../../utils/constants';
import { useCdkModule, useStyles } from '../../../../utils/hooks';
import { AppContext } from '../../../../storage/context';
import { getBreadcrumbItems, TABS } from './helpers';
import MenuBar from '../../../common/MenuBar';
import Button from '../../../common/ui/Buttons/Button';
import TabGroup from '../../../common/ui/TabGroup';
import BreadcrumbMenu from '../../../common/BreadcrumbMenu';
import iconPlusCircle from '../../../../assets/icons/plus-circle.svg';
import iconArrowBack from '../../../../assets/icons/arrow-back.svg';
import './index.scss';

const CdkModulePage = () => {
  const [{ cdkModule = {}, cdkListSearchParams }] = React.useContext(AppContext);
  const { moduleMeta = {} } = cdkModule;

  const menuBarElement = React.useRef();
  const backButtonElement = React.useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const { cdkRepositoryType, cdkId } = useParams();
  const intl = useIntl();
  const fetchCdkModule = useCdkModule();
  const styles = useStyles({
    menuBar: menuBarElement,
    tabGroupButton: backButtonElement,
  });

  const breadcrumbItems = React.useMemo(() => {
    return getBreadcrumbItems(cdkRepositoryType, moduleMeta);
  }, [cdkRepositoryType, moduleMeta]);

  const tabs = React.useMemo(() => {
    return TABS.map((tab) => {
      const path = tab.getPath(cdkRepositoryType, cdkId);

      return {
        label: intl.messages.user?.cdkModulePage[tab.labelKey],
        onClick: () => navigate(path),
        isActive: path === location.pathname,
      };
    });
  }, [cdkId, cdkRepositoryType, intl.messages, location, navigate]);

  const navigateBackToList = () => {
    const { user, cdkRepository, CDK_REPOSITORY } = PATHS;
    const params = qs.stringify(cdkListSearchParams);

    navigate(`${user}${cdkRepository}/${CDK_REPOSITORY.list}/${cdkRepositoryType}?${params}`);
  };

  React.useEffect(() => {
    fetchCdkModule();
  }, [fetchCdkModule]);

  return (
    <div className="cdk-module-page">
      <div className="cdk-module-page__container">
        <MenuBar ref={menuBarElement} />
        <div className="cdk-module-page__content">
          <div className="cdk-module-page__header">
            <div className="cdk-module-page__header-top">
              <h1 className="cdk-module-page__header-title">
                {intl.messages.user?.cdkModulePage.title}
                <BreadcrumbMenu className="cdk-module-page__breadcrumb" items={breadcrumbItems} />
              </h1>
              <Button
                className="dashboard-page__header-button"
                label={intl.messages.user?.dashboardPage.createNewAssessment}
                icon={iconPlusCircle}
                handleClick={() => navigate(`${PATHS.user}${PATHS.assessments}${PATHS.create}`)}
              />
            </div>
            <div className="cdk-module-page__header-bottom">
              <TabGroup
                className="cdk-module-page__tab-group"
                style={styles.tabGroupStyle}
                tabs={tabs}
              />
              <Button
                ref={backButtonElement}
                className="cdk-module-page__button-header-bottom -white-bordered"
                label={intl.messages.user?.cdkModulePage.returnToRepository}
                icon={iconArrowBack}
                handleClick={navigateBackToList}
              />
            </div>
          </div>
          <div className="cdk-module-page__body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CdkModulePage;
