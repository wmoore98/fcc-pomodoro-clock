import React from "react";
import "./App.css";

import Clock from "./Clock";
import SettingController from "./SettingController";

// Copied from:
//   https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const useTimer = () => {
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [isRunning, _setIsRunning] = React.useState(false);
  const delay = 1000; // 1000ms = 1 second

  useInterval(
    () => {
      setElapsedTime((elapsedTime) => elapsedTime + 1);
    },
    isRunning ? delay : null
  );

  const getElapsedTime = () => {
    return elapsedTime;
  };

  const getIsRunning = () => {
    return isRunning;
  };

  const setIsRunning = (bool) => {
    _setIsRunning(!!bool);
  };

  const toggle = () => {
    _setIsRunning((isRunning) => !isRunning);
  };

  const reset = () => {
    setElapsedTime(0);
  };

  return [getElapsedTime, getIsRunning, setIsRunning, toggle, reset];
};

const useControllerState = ({ start = 1, min = 1, max = 60, inc = 1 }) => {
  // Make sure it's an integer
  const iStart = Math.floor(start);
  const iMin = Math.floor(min);
  const iMax = Math.floor(max);
  const iInc = Math.floor(inc);

  const [value, setValue] = React.useState(iStart);

  const increment = () => {
    if (value + iInc < iMax) {
      setValue((value) => value + iInc);
    } else {
      setValue(iMax);
    }
  };

  const decrement = () => {
    if (value - iInc > iMin) {
      setValue((value) => value - iInc);
    } else {
      setValue(iMin);
    }
  };

  const getValue = () => {
    return value;
  };

  const reset = () => {
    setValue(iStart);
  };

  return [getValue, increment, decrement, reset];
};

const App = (props) => {
  const [getBreak, incBreak, decBreak, resetBreak] = useControllerState({
    start: props.breakLength,
  });
  const [
    getSession,
    incSession,
    decSession,
    resetSession,
  ] = useControllerState({ start: props.sessionLength });
  const [
    getElapsedTime,
    getIsRunning,
    setIsRunning,
    toggle,
    resetTimer,
  ] = useTimer();
  const [isOnBreak, setIsOnBreak] = React.useState(false);

  const getTimeLeft = () => {
    const length = isOnBreak ? getBreak() : getSession();
    const totalSeconds = length * 60;
    return totalSeconds - getElapsedTime();
  };

  const audioElem = React.useRef(null);

  const reset = () => {
    resetBreak();
    resetSession();
    resetTimer();
    setIsRunning(false);
    setIsOnBreak(false);
    audioElem.current.pause();
    audioElem.current.currentTime = 0;
  };

  const playAudioBeep = () => {
    audioElem.current.currentTime = 0;
    audioElem.current.play();
  };

  if (getTimeLeft() < 0 && getIsRunning()) {
    playAudioBeep();
    setIsOnBreak((isOnBreak) => !isOnBreak);
    resetTimer();
  }

  return (
    <div className="App">
      <h1 className="App__title">
        Pomodoro
        <br />
        Clock
      </h1>
      <Clock
        isOnBreak={isOnBreak}
        timeLeft={getTimeLeft()}
        isRunning={getIsRunning()}
        toggle={toggle}
        reset={reset}
        audioElem={audioElem}
      />
      <section className="flex-container App__controls">
        <SettingController
          id="Break"
          length={getBreak()}
          decrement={decBreak}
          increment={incBreak}
        />
        <SettingController
          id="Session"
          length={getSession()}
          decrement={decSession}
          increment={incSession}
        />
      </section>
    </div>
  );
};

App.defaultProps = {
  breakLength: 5,
  sessionLength: 25,
};

export default App;
