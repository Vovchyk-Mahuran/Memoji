import React, { useEffect, useState } from 'react';
import './CountDown.css';

function CountDown({
// eslint-disable-next-line react/prop-types
  isTimerActive, setLoseStatus, isResultShowed,
}) {
  const [seconds, setSeconds] = useState(10);
  const [minutes, setMinutes] = useState(1);

  useEffect(() => {
    if (!isResultShowed) {
      setSeconds(5);
      setMinutes(1);
    }
  }, [isResultShowed]);

  useEffect(() => {
    if (isTimerActive && (seconds > 0 || minutes > 0)) {
      if (minutes && !(seconds + 1)) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      setTimeout(setSeconds, 1000, seconds - 1);
    } else if (seconds === 0 && minutes === 0 && isTimerActive) {
      setLoseStatus();
    }
    return clearTimeout(setSeconds, 1000, seconds - 1);
  }, [seconds, isTimerActive]);

  return (
    <div className="countdown">
      { `0${minutes}`.slice(-2) }
      :
      { `0${seconds}`.slice(-2) }
    </div>
  );
}

export default CountDown;
