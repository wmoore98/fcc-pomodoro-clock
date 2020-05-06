import React from "react";

const Timer = ({ label, timeLeft }) => {
  const minLeft = `00${Math.floor(timeLeft / 60)}`;
  const secLeft = `00${timeLeft % 60}`;
  const formatMin = minLeft.substring(minLeft.length - 2);
  const formatSec = secLeft.substring(secLeft.length - 2);
  return (
    <div className="Timer">
      <h2 className="Timer__label" id="timer-label">
        {label}
      </h2>
      <span className="Timer__time-left" id="time-left">
        {formatMin}:{formatSec}
      </span>
    </div>
  );
};

export default Timer;
