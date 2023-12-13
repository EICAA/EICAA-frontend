import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../storage/context';
import { EICAA_URL, MENU_BAR_ITEMS, PATHS } from '../../../utils/constants';
import { handleTokenStorage } from '../../../utils/helpers';
import { useHandleLogout } from '../../../utils/hooks';
import MenuBarItem from '../MenuBarItem';
import ButtonRectangular from '../ui/Buttons/ButtonRectangular';
import home from '../../../assets/icons/home.svg';
import homeWhite from '../../../assets/icons/home-white.svg';
import checkedList from '../../../assets/icons/checked-list.svg';
import checkedListWhite from '../../../assets/icons/checked-list-white.svg';
import archive from '../../../assets/icons/archive.svg';
import archiveWhite from '../../../assets/icons/archive-white.svg';
import lightBulb from '../../../assets/icons/light-bulb.svg';
import lightBulbWhite from '../../../assets/icons/light-bulb-white.svg';
import questionMark from '../../../assets/icons/question-mark.svg';
import questionMarkWhite from '../../../assets/icons/question-mark-white.svg';
import gear from '../../../assets/icons/gear.svg';
import logout from '../../../assets/icons/logout.svg';
import './index.scss';

const images = {
  home,
  homeWhite,
  checkedList,
  checkedListWhite,
  archive,
  archiveWhite,
  lightBulb,
  lightBulbWhite,
  questionMark,
  questionMarkWhite,
  gear,
  logout,
};

const MenuBar = React.forwardRef((props, ref) => {
  const { user } = React.useContext(AppContext)[0];

  const token = handleTokenStorage.get();

  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  const handleLogout = useHandleLogout();

  return (
    <div ref={ref} className="menu-bar">
      <div className="menu-bar__header">
        <div
          className="menu-bar__header-logo"
          onClick={() => {
            window.open(EICAA_URL, '_blank');
          }}
        />
      </div>
      <div className="menu-bar__body">
        <div className="menu-bar__menu-section">
          <h4 className="menu-bar__menu-title">{intl.messages.user?.menuBar.menuTitle}</h4>
          <div className="menu-bar__menu-list">
            {Object.keys(MENU_BAR_ITEMS).map((itemKey) => {
              const item = MENU_BAR_ITEMS[itemKey];

              return (
                <MenuBarItem
                  key={item.id}
                  className="menu-bar__menu-item"
                  iconUrl={images[item.iconName]}
                  iconUrlActive={images[`${item.iconName}White`]}
                  label={intl.messages.user?.menuBar[item.labelKey]}
                  active={
                    location.pathname?.includes(item.activePath) ||
                    item.activePaths?.some((activePath) => location.pathname.includes(activePath))
                  }
                  disabled={[5].includes(item.id) || (item.isProtected && !token)}
                  handleClick={() => navigate(item.redirectTo)}
                />
              );
            })}
          </div>
        </div>
        <div className="menu-bar__user-section">
          <h4 className="menu-bar__user-title">{intl.messages.user?.menuBar.userTitle}</h4>
          {user?.firstName || user?.lastName ? (
            <h2 className="menu-bar__user-name">{`${user.firstName} ${user.lastName}`}</h2>
          ) : (
            <h2 className="menu-bar__user-name">{intl.messages.user?.menuBar.guest}</h2>
          )}
          {user?.email ? (
            <h2 className="menu-bar__user-email">{user.email}</h2>
          ) : (
            <h2 className="menu-bar__user-email">{intl.messages.user?.menuBar.notLoggedIn}</h2>
          )}
          <div className="menu-bar__user-button-container">
            <ButtonRectangular
              className="menu-bar__user-button"
              iconUrl={images.gear}
              disabled={!token}
              handleClick={() => navigate(`${PATHS.user}${PATHS.account}`)}
            />
            <ButtonRectangular
              className="menu-bar__user-button"
              iconUrl={images.logout}
              handleClick={handleLogout}
            />
          </div>
        </div>
      </div>
      <div className="menu-bar__footer">
        <div className="menu-bar__footer-logo" />
        <div className="menu-bar__footer-separator" />

        <div className="menu-bar__footer-button-container">
          <p className="menu-bar__footer-button">
            <Link to={`${PATHS.user}${PATHS.frequentlyAsked}`} target="_blank">
              {intl.messages.common?.faqs}
            </Link>
          </p>
          <p className="menu-bar__footer-button">
            <Link to={`${PATHS.user}${PATHS.privacyPolicy}`} target="_blank">
              {intl.messages.common?.privacyPolicy}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});

export default MenuBar;
