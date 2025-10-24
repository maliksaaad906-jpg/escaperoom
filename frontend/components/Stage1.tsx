"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function Stage1({ onComplete }: { onComplete: () => void }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const saveResult = async (codeInput: string) => {
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "21483818",
          stage: 1,
          code: codeInput,
        }),
      });
      setSaving(false);
      return res.ok;
    } catch {
      setSaving(false);
      return false;
    }
  };

  const checkCode = async () => {
    const valid =
      /print\((["'`])hello world\1\)/i.test(code.trim()) ||
      /console\.log\((["'`])hello world\1\)/i.test(code.trim());
    if (valid) {
      const saved = await saveResult(code);
      setMsg(
        saved
          ? "✅ Code correct and saved! Proceeding to Stage 2..."
          : "⚠️ Code correct, but failed to save in DB."
      );
      setTimeout(onComplete, 1500);
    } else {
      setMsg("❌ Try again. Hint: console.log('Hello World');");
    }
  };

  return (
    <div>
      <h4>Stage 1: Print “Hello World”</h4>
      <p className="text-secondary">Fix the broken print statement below.</p>
      <textarea
        rows={4}
        className="form-control"
        placeholder={`Broken code:\nconsol.log('hello world')`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="btn btn-success mt-3"
        onClick={checkCode}
        disabled={saving}
      >
        {saving ? "💾 Saving..." : "Run Code"}
      </button>
      <p className="mt-2">{msg}</p>
    </div>
  );
}
