"use client";
import { useState } from "react";
import MessageBox from "./MessageBox";

interface StageProps {
  onComplete?: () => void;
}

export default function Stage3({ onComplete }: StageProps) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const checkAnswer = () => {
    const cleaned = code.replace(/\s+/g, " ").trim();

    const hasForLoop =
      /for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<=?\s*1000\s*;\s*i\s*\+\+\s*\)/.test(cleaned);
    const logsNumbers = /console\.log\s*\(\s*i\s*\)/.test(cleaned);

    if (hasForLoop && logsNumbers) {
      setMessage("🎉 Great job! You’ve generated all numbers and escaped the room!");
      if (onComplete) setTimeout(onComplete, 2000);
    } else if (cleaned.includes("for")) {
      setMessage("⚠️ Your loop looks close! Check your condition and console.log placement.");
    } else {
      setMessage("❌ Missing a for-loop or console.log statement.");
    }
  };

  return (
    <div className="text-center">
      <h4>Stage 3: Generate Numbers</h4>
      <p className="text-secondary">
        Write a <code>for</code> loop that prints every number from 0 to 1000.
      </p>

      <textarea
        className="form-control mt-2"
        rows={6}
        placeholder={`Example:\nfor (let i = 0; i <= 1000; i++) {\n  console.log(i);\n}`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="btn btn-glow mt-3" onClick={checkAnswer}>
        Run Code
      </button>

      <MessageBox message={message} />
    </div>
  );
}
