import { useRef, useState } from "react";

const Timer = () => {
  const timeInterval = useRef(null);
  const [time, setTime] = useState(0);

  const startTimer = (start, isPauseClicked) => {
    if (start && timeInterval) {
      timeInterval.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (isPauseClicked) {
      console.log("if");
      clearInterval(timeInterval.current);
      setTime(time);
    }
  };

  const reset = () => {
    clearInterval(timeInterval.current);
    setTime(0);
  };
  return (
    <div>
      <h1>Timer</h1>
      <h2>{time}</h2>
      <button
        onClick={() => {
          startTimer(true, false);
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          startTimer(false, true);
        }}
      >
        Pause
      </button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export default Timer