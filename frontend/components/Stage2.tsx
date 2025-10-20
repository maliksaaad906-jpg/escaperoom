"use client";
import { useState } from "react";
import MessageBox from "./MessageBox";

interface StageProps {
  onComplete: () => void;
}

export default function Stage2({ onComplete }: StageProps) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const checkAnswer = () => {
    const cleaned = code.replace(/\s+/g, " ").trim();

    const looksLikeFunction =
      /function\s+add\s*\(\s*a\s*,\s*b\s*\)\s*\{[^}]*\}/.test(cleaned);
    const returnsSum =
      /return\s+a\s*\+\s*b\s*;?/i.test(cleaned) ||
      /return\s*b\s*\+\s*a\s*;?/i.test(cleaned);

    if (looksLikeFunction && returnsSum) {
      setMessage("✅ Function fixed! It correctly adds two numbers. Moving to Stage 3...");
      setTimeout(onComplete, 1500);
    } else if (looksLikeFunction) {
      setMessage("⚠️ The function is structured correctly but check your return logic.");
    } else {
      setMessage("❌ The function definition is missing or malformed.");
    }
  };

  return (
    <div className="text-center">
      <h4>Stage 2: Debug the Function</h4>
      <p className="text-secondary">
        The function <code>add(a, b)</code> should return the sum of two numbers.
        Fix any errors.
      </p>

      <textarea
        className="form-control mt-2"
        rows={5}
        placeholder={`Broken code:\nfunction add(a, b) {\n  return a - b;\n}`}
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
