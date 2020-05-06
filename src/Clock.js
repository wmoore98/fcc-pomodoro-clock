import React from "react";
import Timer from "./Timer";

const AUDIO_URL = "https://goo.gl/65cBl1";

const Clock = ({
  isOnBreak,
  timeLeft,
  isRunning,
  toggle,
  reset,
  audioElem,
}) => {
  return (
    <div className="container Clock">
      <section className="Clock__display">
        <Timer label={isOnBreak ? "Break" : "Session"} timeLeft={timeLeft} />
      </section>
      <section className="Clock__buttons">
        <button className="btn" id="start_stop" onClick={toggle}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="btn" id="reset" onClick={reset}>
          Reset
        </button>
      </section>
      <audio id="beep" ref={audioElem} src={AUDIO_URL}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
};

export default Clock;
