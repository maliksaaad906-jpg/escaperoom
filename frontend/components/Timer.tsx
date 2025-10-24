"use client";
import { useEffect, useState } from "react";

interface TimerProps {
  onTimeEnd: () => void;
}

export default function Timer({ onTimeEnd }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          onTimeEnd();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, seconds, onTimeEnd]);

  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      {!running ? (
        <>
          <input
            type="number"
            min={1}
            placeholder="Seconds"
            className="form-control w-25 me-2"
            onChange={(e) => setSeconds(parseInt(e.target.value || "0"))}
          />
          <button
            className="btn btn-primary"
            onClick={() => setRunning(true)}
            disabled={seconds <= 0}
          >
            Start
          </button>
        </>
      ) : (
        <div className="fs-4">⏰ {seconds}s</div>
      )}
    </div>
  );
}
