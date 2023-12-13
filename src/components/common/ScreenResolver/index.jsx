import React from 'react';
import { BREAKPOINTS } from '../../../utils/breakpoints';

const RESOLUTION_TYPES = {
  mobile: 'mobile',
  desktop: 'desktop'
};

const ScreenResolver = props => {
  const [isMobile, setIsMobile] = React.useState(false);

  const { mobile, desktop } = props;
  const largeSize = React.useMemo(() => {
    return props.large || BREAKPOINTS.md;
  }, [props.large]);

  const setResolution = value => {
    setIsMobile(value);
  };

  const getWindowResolution = React.useCallback(() => {
    return window.innerWidth < largeSize ? RESOLUTION_TYPES.mobile : RESOLUTION_TYPES.desktop;
  }, [largeSize]);

  const onResize = React.useCallback(() => {
    setResolution(getWindowResolution() === RESOLUTION_TYPES.mobile);
  }, [getWindowResolution]);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
  }, [onResize]);

  React.useEffect(() => {
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return (
    <>
      {isMobile ? (
        !!mobile && mobile
      ) : (
        !!desktop && desktop
      )
      }
    </>
  );
}

export default ScreenResolver;
