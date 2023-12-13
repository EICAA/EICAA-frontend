import React from 'react';

const AnimateDots = props => {
  const {
    delay=350,
    minDots=1,
    maxDots=3,
  } = props;

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [count, delay]);

  return <span>{'.'.repeat(minDots + (count % maxDots))}</span>;
};

export default AnimateDots;
