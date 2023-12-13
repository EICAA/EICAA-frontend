import React from 'react';
import { useIntl } from 'react-intl';
import { BREAKPOINTS } from '../breakpoints';

export const useStyles = (elements) => {
  const { menuBar, tabGroupButton, cdkCardContainer, cdkCardTitle, descriptionElement, cdkTable } =
    elements;

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [menuBarWidth, setMenuBarWidth] = React.useState(0);
  const [tabGroupButtonWidth, setTabGroupButtonWidth] = React.useState(0);
  const [cdkCardContainerHeight, setCdkCardContainerHeight] = React.useState(0);
  const [cdkCardTitleHeight, setCdkCardTitleHeight] = React.useState(0);
  const [cdkCardDescriptionHeight, setCdkCardDescripionHeight] = React.useState(0);
  const [cdkTableHeight, setCdkTableHeight] = React.useState(0);
  const [cdkCardPaddingY, setCdkCardPaddingY] = React.useState(0);

  const intl = useIntl();

  const tabGroupStyle = React.useMemo(() => {
    return { width: `calc(${windowWidth}px - ${menuBarWidth + tabGroupButtonWidth + 100 + 20}px)` };
  }, [windowWidth, menuBarWidth, tabGroupButtonWidth]);

  const cdkCardDescriptionStyle = React.useMemo(() => {
    return {
      height: `calc(${cdkCardContainerHeight}px - ${cdkCardTitleHeight + cdkCardPaddingY + 15}px)`,
    };
  }, [cdkCardContainerHeight, cdkCardTitleHeight, cdkCardPaddingY]);

  const isCdkCardMaxHeight = React.useMemo(() => {
    return cdkCardDescriptionHeight >= cdkCardContainerHeight;
  }, [cdkCardDescriptionHeight, cdkCardContainerHeight]);

  const cdkTableStyle = React.useMemo(() => {
    return cdkTableHeight;
  }, [cdkTableHeight]);

  const getTabGroupDimensions = React.useCallback(() => {
    setMenuBarWidth(menuBar?.current?.offsetWidth || 0);
    setTabGroupButtonWidth(tabGroupButton?.current?.offsetWidth || 0);
  }, [menuBar, tabGroupButton]);

  const getCdkCardDimensions = React.useCallback(() => {
    setCdkCardContainerHeight(cdkCardContainer?.current?.offsetHeight || 0);
    setCdkCardTitleHeight(cdkCardTitle?.current?.offsetHeight || 0);
    setCdkCardDescripionHeight(descriptionElement?.current?.offsetHeight || 0);
  }, [cdkCardContainer, cdkCardTitle, descriptionElement]);

  const getCdkTableHeight = React.useCallback(() => {
    setCdkTableHeight(cdkTable?.current?.offsetHeight || 0);
  }, [cdkTable]);

  const getCdkCardPaddingY = React.useCallback(() => {
    if (window.innerWidth <= BREAKPOINTS.xxl) {
      setCdkCardPaddingY(20);
    } else {
      setCdkCardPaddingY(32);
    }
  }, []);

  const onResize = React.useCallback(() => {
    setWindowWidth(window.innerWidth);
    getTabGroupDimensions();
    getCdkCardDimensions();
    getCdkCardPaddingY();
    getCdkTableHeight();
  }, [getTabGroupDimensions, getCdkCardDimensions, getCdkCardPaddingY, getCdkTableHeight]);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize, intl]);

  return React.useMemo(
    () => ({ tabGroupStyle, cdkCardDescriptionStyle, isCdkCardMaxHeight, cdkTableStyle }),
    [tabGroupStyle, cdkCardDescriptionStyle, isCdkCardMaxHeight, cdkTableStyle],
  );
};
