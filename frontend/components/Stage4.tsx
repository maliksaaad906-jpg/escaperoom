"use client";
import { useState } from "react";

export default function Stage4({ onComplete }: { onComplete: () => void }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const checkCode = () => {
    if (code.includes("JSON") && code.includes("split") && code.includes("join")) {
      setMsg("✅ Nice work! You’ve escaped the room!");
      setTimeout(onComplete, 2000);
    } else {
      setMsg("❌ Hint: You need to parse JSON and format it like CSV.");
    }
  };

  return (
    <div>
      <h4>Stage 4: Convert JSON → CSV</h4>
      <textarea
        rows={6}
        className="form-control"
        placeholder={`const data = [{name:'Ali', score:100}, {name:'Sara', score:90}];\n
const csv = data.map(o => Object.values(o).join(',')).join('\\n');\n
console.log(csv);`}
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
