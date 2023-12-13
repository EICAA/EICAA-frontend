import React from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  if (!!document.fullscreenElement && !isFullscreen) {
    setIsFullscreen(true);
  }
  if (!document.fullscreenElement && isFullscreen) {
    setIsFullscreen(false);
  }

  const enter = React.useCallback((element) => {
    if (document.fullscreenEnabled) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }, []);

  const exit = React.useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }, []);

  return React.useMemo(() => (
    { isFullscreen, enter, exit }
  ), [isFullscreen, enter, exit]);
};
