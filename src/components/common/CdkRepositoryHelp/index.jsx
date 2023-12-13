import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { BREAKPOINTS } from '../../../utils/breakpoints';
import { useResolveScreen } from '../../../utils/hooks';
import infoIcon from '../../../assets/icons/info-circle.svg';
import handleIcon from '../../../assets/icons/handle.svg';
import './index.scss';

const CdkRepositoryHelp = (props) => {
  const { className } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const intl = useIntl();
  const screen = useResolveScreen(BREAKPOINTS.xxl);

  React.useEffect(() => {
    if (screen.isMobile) {
      setIsOpen(false);
    } else if (!screen.isMobile) {
      setIsOpen(true);
    }
  }, [screen.isMobile]);

  const descriptionWithLinkReplaced = intl.messages.user?.cdkRepositoryPage.helpDescription.replace(
    'www.eicaa.eu',
    '<a href="https://www.eicaa.eu" target="_blank" rel="noopener noreferrer">www.eicaa.eu</a>'
  );

  return (
    <aside
      className={classnames('cdk-repository-help', className && className, isOpen && '-open')}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="cdk-repository-help__container">
        <div className={classnames('cdk-repository-help__content', isOpen && '-open')}>
          <img className="cdk-repository-help__icon" src={infoIcon} alt="info" />
          <p className="cdk-repository-help__title">
            {intl.messages.user?.cdkRepositoryPage.helpTitle}
          </p>
          <div className="cdk-repository-help__description-container">
            <p className="cdk-repository-help__description" dangerouslySetInnerHTML={{ __html: descriptionWithLinkReplaced }} />
          </div>
        </div>
        <div className={classnames('cdk-repository-help__handle', isOpen && '-open')}>
          <img className="cdk-repository-help__handle-icon" src={handleIcon} alt="handle" />
        </div>
      </div>
      <div className={classnames('cdk-repository-help__icon-trigger-container', isOpen && '-open')}>
        <img className="cdk-repository-help__icon-trigger" src={infoIcon} alt="info" />
      </div>
    </aside>
  );
};


export default CdkRepositoryHelp;
