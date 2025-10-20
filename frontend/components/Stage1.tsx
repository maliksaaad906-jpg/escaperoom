"use client";
import { useState } from "react";
import MessageBox from "./MessageBox";

interface StageProps {
  onComplete: () => void;
}

export default function Stage1({ onComplete }: StageProps) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const checkAnswer = () => {
    const normalized = code.replace(/\s+/g, " ").trim();

    const valid =
      /console\.log\((["'`])hello world\1\);?/i.test(normalized) ||
      /console\.log\((["'`])Hello World\1\);?/i.test(normalized);

    if (valid) {
      setMessage("✅ Nice! Code fixed successfully. Proceeding to Stage 2...");
      setTimeout(onComplete, 1500);
    } else if (normalized.includes("console.log")) {
      setMessage("⚠️ You're close! Check your quotes and capitalization.");
    } else {
      setMessage("❌ That’s not valid JS. Try using console.log('Hello World');");
    }
  };

  return (
    <div className="text-center">
      <h4>Stage 1: Fix the Broken Code</h4>
      <p className="text-secondary">
        The console should print <code>Hello World</code>. Correct the code below.
      </p>

      <textarea
        className="form-control mt-2"
        rows={3}
        placeholder={`Broken code:\nconsol.log('hello world')`}
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
