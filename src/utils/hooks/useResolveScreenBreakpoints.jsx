import React from 'react';

const ORIENTATION_TYPES = {
  landscape: 'landscape',
  portrait: 'portrait',
};

export const useResolveScreenBreakpoints = (breakpoints={}) => {
  const [screenSize, setScreenSize] = React.useState(breakpoints.xxxl);
  const [isLandscape, setIsLandscape] = React.useState();

  const getWindowResolution = React.useCallback(() => {
    if (
      typeof breakpoints !== 'object'
      || breakpoints instanceof Array
    ) {
      return;
    }

    return Object.keys(breakpoints)
      .sort((key1, key2) => breakpoints[key1] - breakpoints[key2])
      .find(key => (window.innerWidth < breakpoints[key]))
      || breakpoints.xxxl;
  }, [breakpoints]);

  const getWindowOrientation = React.useCallback(() => {
    return window.innerWidth < window.innerHeight ? ORIENTATION_TYPES.portrait : ORIENTATION_TYPES.landscape;
  }, []);

  const onResize = React.useCallback(() => {
    setScreenSize(getWindowResolution());
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
    { screenSize, isLandscape }
  ), [screenSize, isLandscape]);
};
