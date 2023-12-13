import React from 'react';
import { BREAKPOINTS } from '../breakpoints';

const RESOLUTION_TYPES = {
  mobile: 'mobile',
  desktop: 'desktop'
};

const ORIENTATION_TYPES = {
  landscape: 'landscape',
  portrait: 'portrait',
};

export const useResolveScreen = breakpoint => {
  const [isMobile, setIsMobile] = React.useState();
  const [isLandscape, setIsLandscape] = React.useState();

  const largeSize = React.useMemo(() => {
    return breakpoint || BREAKPOINTS.md;
  }, [breakpoint]);

  const getWindowResolution = React.useCallback(() => {
    return window.innerWidth < largeSize ? RESOLUTION_TYPES.mobile : RESOLUTION_TYPES.desktop;
  }, [largeSize]);

  const getWindowOrientation = React.useCallback(() => {
    return window.innerWidth < window.innerHeight ? ORIENTATION_TYPES.portrait : ORIENTATION_TYPES.landscape;
  }, []);

  const onResize = React.useCallback(() => {
    setIsMobile(getWindowResolution() === RESOLUTION_TYPES.mobile);
    setIsLandscape(getWindowOrientation() === ORIENTATION_TYPES.landscape);
  }, [getWindowResolution, getWindowOrientation]);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return React.useMemo(() => (
    { isMobile, isLandscape }
  ), [isMobile, isLandscape]);
};
