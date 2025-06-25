import React, { useState, useEffect } from 'react';
import '../styles/Clock.css'; 

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const timeString = currentTime.toLocaleTimeString();
  const dateString = currentTime.toLocaleDateString();

  return (
    <div className="clock-container">
      <div className="date">{dateString}</div>
      <div className="time">{timeString}</div>
    </div>
  );
}

export default Clock;
