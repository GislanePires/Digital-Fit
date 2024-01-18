import "./style.scss";
import { useState, useEffect } from "react";
import TimerButtons from "../TimerButtons/index";

export default function Counter({ button }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(60000);

  const [isActive2, setIsActive2] = useState(false);
  const [isPaused2, setIsPaused2] = useState(true);
  const [time2, setTime2] = useState(60000);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => Math.max(time - 1000, 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  useEffect(() => {
    let interval2 = null;

    if (isActive2 && isPaused2 === false) {
      interval2 = setInterval(() => {
        setTime2((time2) => Math.max(time2 - 1000, 0));
      }, 1000);
    } else {
      clearInterval(interval2);
    }
    return () => {
      clearInterval(interval2);
    };
  }, [isActive2, isPaused2]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setIsActive2(true);
    setIsPaused2(true);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(60000); // Redefine o cronômetro para 60 segundos
  };

  const handleStart2 = () => {
    setIsActive(false);
    setIsPaused(true);
    setIsActive2(true);
    setIsPaused2(false);
  };

  const handlePauseResume2 = () => {
    setIsPaused2(!isPaused2);
  };

  const handleReset2 = () => {
    setIsActive2(false);
    setTime2(60000);
  };

  const seconds = Math.floor(time / 1000);
  const seconds2 = Math.floor(time2 / 1000);
  const estiloDoTempo = seconds <= 9 ? { color: "red" } : { color: "#1F5EAF" };
  const estiloDoTempo2 =
    seconds2 <= 9 ? { color: "red" } : { color: "#1F5EAF" };
  return button === "btn1" ? (
    <div className="texto-input">
      <div className="stop-watch">
        <TimerButtons
          active={isActive}
          isPaused={!isActive}
          handleStart={handleStart}
          handlePauseResume={handlePauseResume}
          handleReset={handleReset}
        />
        <p
          className="tempo-restante"
          aria-label="Tempo restante"
          style={estiloDoTempo}
        >
          Tempo restante: {seconds} segundos{" "}
        </p>
        {/* <Timer time={time} /> */}
      </div>
    </div>
  ) : (
    <div className="texto-input">
      <div className="stop-watch2">
        <TimerButtons
          active={isActive2}
          isPaused={isPaused2}
          handleStart={handleStart2}
          handlePauseResume={handlePauseResume2}
          handleReset={handleReset2}
        />
        <p
          className="tempo-restante"
          aria-label="Tempo restante"
          style={estiloDoTempo2}
        >
          Tempo restante: {seconds2} segundos{" "}
        </p>
        {/* <Timer time={time2} /> */}
      </div>
    </div>
  );
}
