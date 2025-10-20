"use client";
import { useState } from "react";
import Stage1 from "@/components/Stage1";
import Stage2 from "@/components/Stage2";
import Stage3 from "@/components/Stage3";
import Timer from "@/components/Timer";

export default function EscapeRoom() {
  const [stage, setStage] = useState(1);

  return (
    <div
      style={{
        backgroundImage: "url('/room-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="glass-card text-center text-light col-10 col-md-6">
          <h2 className="mb-3 fw-bold">🧩 Escape Room Challenge</h2>
          <Timer onTimeEnd={() => alert("⏰ Time’s up! You lost!")} />

          <hr className="border-light" />

          {stage === 1 && <Stage1 onComplete={() => setStage(2)} />}
          {stage === 2 && <Stage2 onComplete={() => setStage(3)} />}
          {stage === 3 && <Stage3 />}
        </div>
      </div>
    </div>
  );
}
