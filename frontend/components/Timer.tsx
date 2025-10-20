"use client";
import { useEffect, useState } from "react";

interface TimerProps {
  initial?: number;
  onTimeEnd: () => void;
  onTick?: (secs: number) => void;
}

export default function Timer({ initial = 0, onTimeEnd, onTick }: TimerProps) {
  const [seconds, setSeconds] = useState<number>(initial);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        const next = s - 1;
        onTick?.(next);
        if (next <= 0) {
          setRunning(false);
          onTimeEnd();
          clearInterval(id);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, seconds, onTimeEnd, onTick]);

  return (
    <div className="d-flex align-items-center justify-content-center mb-3">
      {!running ? (
        <>
          <input
            aria-label="Set timer seconds"
            type="number"
            className="form-control w-25 me-2"
            min={1}
            placeholder="Seconds"
            onChange={(e) => setSeconds(parseInt(e.target.value || "0"))}
          />
          <button className="btn btn-primary" onClick={() => setRunning(true)} disabled={seconds <= 0}>
            Start
          </button>
        </>
      ) : (
        <div className="fs-4">
          ⏰ <strong>{seconds}</strong> s
        </div>
      )}
    </div>
  );
}
