import React, { useEffect, useRef, useState } from 'react';

const ProgressBar = (props) => {
  const [prog, setProg] = useState(0);

  let timer = useRef(null);
  useEffect(() => {
    timer.current = setInterval(() => {
      setProg((prev) => prev + 1);
    }, 1000);
    setProg(Math.min(100, Math.max(prog, 0)));
    if (prog === 100) {
      setProg(0);
    }
    return () => clearInterval(timer.current);
  }, [props.value, prog]);

  return (
    <div
      style={{
        width: '50%',
        display: 'flex',
        alignSelf: 'center',
        alignContent: 'center',
        margin: 'auto',
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'fit-content',
        position: 'relative',
      }}
    >
      <div style={{}}>{prog}</div>
      <div
        style={{
          width: `${prog}%`,
          backgroundColor: 'yellow',
          height: '100%',
          display: 'flex',
          position: 'absolute',
          left: 0,
        }}
      />
    </div>
  );
};

export default ProgressBar;
