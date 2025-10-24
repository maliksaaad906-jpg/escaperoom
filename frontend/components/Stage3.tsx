"use client";
import { useState } from "react";

export default function Stage3({ onComplete }: { onComplete: () => void }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const checkCode = () => {
    if (
      /for\s*\(.*let\s+i\s*=\s*0.*i\s*<=\s*1000.*console\.log\s*\(.*i.*\)/.test(
        code
      )
    ) {
      setMsg("✅ Correct! Now for the final challenge...");
      setTimeout(onComplete, 1000);
    } else {
      setMsg("❌ Try writing a loop that logs 0–1000.");
    }
  };

  return (
    <div>
      <h4>Stage 3: Generate Numbers</h4>
      <textarea
        rows={6}
        className="form-control"
        placeholder={`for (let i = 0; i <= 1000; i++) {\n  console.log(i);\n}`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button className="btn btn-success mt-3" onClick={checkCode}>
        Run Code
      </button>
      <p className="mt-2">{msg}</p>
    </div>
  );
}
