import React from 'react';

export const useHorizontalScroll = element => {
  const scrollHandler = React.useCallback(event => {
    if (!element) {
      return;
    }

    if (event.deltaY) {
      element.scrollLeft += event.deltaY;
    }
  }, [element]);

  React.useEffect(() => {
    element?.addEventListener('wheel', scrollHandler);
    return () => {
      element?.removeEventListener('wheel', scrollHandler);
    };
  }, [element, scrollHandler]);
};
