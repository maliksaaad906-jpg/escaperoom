"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Timer from "@/components/Timer";
import Stage1 from "@/components/Stage1";
import Stage2 from "@/components/Stage2";
import Stage3 from "@/components/Stage3";
import Stage4 from "@/components/Stage4";
import EscapeComplete from "@/components/EscapeComplete";

export default function EscapeRoom() {
  const [stage, setStage] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  // Lambda URL for hints
  const HINT_API =
    process.env.NEXT_PUBLIC_HINT_URL ??
    "https://dlq5x2uvqyuu3rop24w6twwjey0slznv.lambda-url.us-east-1.on.aws/hint";

  // Fetch hint from Lambda
  const fetchHint = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${HINT_API}?stage=${stage}`);
      const data = await res.json();
      setHint(data.hint || "No hint available yet!");
    } catch {
      setHint("⚠️ Could not fetch hint. Check connection or Lambda.");
    } finally {
      setLoading(false);
    }
  };

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
      <Navbar />

      {/* Overlay */}
      <div
        className="bg-overlay"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        }}
      ></div>

      {/* Game Content */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="glass-card text-center text-light col-10 col-md-6 p-4 rounded-4 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h2 className="mb-3 fw-bold">🧩 Escape Room Challenge</h2>
          <Timer onTimeEnd={() => alert("⏰ Time’s up! You lost!")} />

          <hr className="border-light" />

          {!completed ? (
            <>
              {stage === 1 && <Stage1 onComplete={() => setStage(2)} />}
              {stage === 2 && <Stage2 onComplete={() => setStage(3)} />}
              {stage === 3 && <Stage3 onComplete={() => setStage(4)} />}
              {stage === 4 && <Stage4 onComplete={() => setCompleted(true)} />}

              {/* Hint Section */}
              <div className="mt-4">
                <button
                  onClick={fetchHint}
                  className="btn btn-warning fw-semibold px-4 py-2"
                  disabled={loading}
                >
                  {loading ? "Fetching Hint..." : "💡 Get Hint"}
                </button>

                {hint && (
                  <p
                    className="alert alert-info mt-3 mx-auto"
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "10px",
                      color: "#fff",
                      maxWidth: "400px",
                    }}
                  >
                    {hint}
                  </p>
                )}
              </div>
            </>
          ) : (
            <EscapeComplete />
          )}
        </div>
      </div>
    </div>
  );
}
