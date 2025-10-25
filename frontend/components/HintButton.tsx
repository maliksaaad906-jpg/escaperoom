"use client";
import { useState } from "react";

const HINT_API = process.env.NEXT_PUBLIC_HINT_URL!;

export default function HintButton() {
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHint = async () => {
    setLoading(true);
    try {
      const res = await fetch(HINT_API);
      const data = await res.json();
      setHint(data.hint);
    } catch {
      setHint("⚠️ Failed to fetch hint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-3">
      <button
        className="btn btn-warning fw-bold"
        onClick={fetchHint}
        disabled={loading}
      >
        {loading ? "Loading..." : "💡 Get Hint"}
      </button>

      {hint && (
        <p className="alert alert-info mt-3" style={{ maxWidth: "500px", margin: "auto" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
