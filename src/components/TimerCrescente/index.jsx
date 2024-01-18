import React, { useState, useEffect } from "react";
import "./styles.scss";

const TimerCrescente = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedTimes, setCompletedTimes] = useState([]);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const completeTimer = () => {
    const completedTime = `Tempo ${
      completedTimes.length + 1
    }: ${seconds} segundos`;
    setCompletedTimes((prevTimes) => [...prevTimes, completedTime]);
    resetTimer();
  };

  return (
    <div className="timerCresncente-container">
      <h3>Timer: {seconds} segundos</h3>
      <div className="botoesTimer">
        <button onClick={startTimer} disabled={isRunning}>
          Iniciar
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Parar
        </button>
        <button onClick={completeTimer}>Concluir</button>
      </div>
      <div>
        <h4>Tempos Concluídos:</h4>
        <ul>
          {completedTimes.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimerCrescente;
