"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function Stage2({ onComplete }: { onComplete: () => void }) {
  const [msg, setMsg] = useState("");

  const saveResult = async (codeInput: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "21483818",
          stage: 2,
          code: codeInput,
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const handleClick = async (color: string) => {
    if (color === "blue") {
      const saved = await saveResult("Found the blue color");
      setMsg(
        saved
          ? "✅ You found and saved the correct color! Moving to Stage 3..."
          : "⚠️ Correct, but save failed."
      );
      setTimeout(onComplete, 1500);
    } else setMsg("❌ Wrong color. Try again.");
  };

  return (
    <div>
      <h4>Stage 2: Find the Right Color</h4>
      <p className="text-secondary">
        Only the <b>blue</b> box opens the next door. Choose wisely.
      </p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        {["red", "blue", "green"].map((c) => (
          <div
            key={c}
            onClick={() => handleClick(c)}
            style={{
              width: "60px",
              height: "60px",
              background: c,
              borderRadius: "10px",
              cursor: "pointer",
              border: "2px solid #fff",
            }}
          ></div>
        ))}
      </div>
      <p className="mt-3">{msg}</p>
    </div>
  );
}
