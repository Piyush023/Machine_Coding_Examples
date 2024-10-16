import { useRef } from 'react';
import { useState } from 'react';

const MouseHoverTimer = () => {
  const [time, setTime] = useState(0);

  let timer = useRef(null);

  const startTimer = (isMouseHover) => {
    if (!isMouseHover) {
      clearInterval(timer.current);
    } else {
      timer.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const reset = () => {
    // clearInterval(timer);
    setTime(0);
  };

  return (
    <div>
      <h1>Mouse Hover Timer</h1>
      {/* Box */}
      <div
        className='box'
        onMouseEnter={() => startTimer(true)}
        onMouseLeave={() => startTimer(false)}
      >
        <h2>{time}</h2>
      </div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export default MouseHoverTimer;
