import React, { useState, useEffect } from 'react';

function ProgressBar({ id, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 100));
      }, 200);
    } else {
      clearInterval(interval);
      onComplete(id); // Notify parent when progress completes
    }

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [progress, id, onComplete]);

  return (
    <div style={{ marginBottom: '10px' }}>
      <div
        style={{
          width: '100%',
          backgroundColor: '#e0e0e0',
          height: '20px',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: progress === 100 ? '#76c7c0' : '#3b5998',
            height: '100%',
            borderRadius: '10px',
            transition: 'width 0.2s ease',
          }}
        ></div>
      </div>
      <span>{progress}%</span>
    </div>
  );
}

function MPBar() {
  const [bars, setBars] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [queuedBars, setQueuedBars] = useState([]);
  const MAX_ACTIVE = 5;

  const addProgressBar = () => {
    const newBarId = bars.length + 1;
    setBars((prevBars) => [...prevBars, newBarId]);

    if (activeBars.length < MAX_ACTIVE) {
      setActiveBars((prevActive) => [...prevActive, newBarId]);
    } else {
      setQueuedBars((prevQueued) => [...prevQueued, newBarId]);
    }
  };

  const handleComplete = (id) => {
    setActiveBars((prevActive) => prevActive.filter((barId) => barId !== id));

    if (queuedBars.length > 0) {
      const [nextBar, ...rest] = queuedBars;
      setActiveBars((prevActive) => [...prevActive, nextBar]);
      setQueuedBars(rest);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Progress Bars</h1>
      <button onClick={addProgressBar}>Add Progress Bar</button>

      <div style={{ marginTop: '20px' }}>
        {activeBars.map((barId) => (
          <ProgressBar key={barId} id={barId} onComplete={handleComplete} />
        ))}
      </div>
    </div>
  );
}

export default MPBar;
