"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Timer from "../../components/Timer";
import Stage from "@/components/Stage1";
import EscapeComplete from "@/components/EscapeComplete";


export default function EscapeRoom() {
  const [dark, setDark] = useState(false);
  const [time, setTime] = useState(0);
  const [timeInput, setTimeInput] = useState("");
  const [timerOn, setTimerOn] = useState(false);
  const [stage, setStage] = useState(1);
  const [message, setMessage] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [saved, setSaved] = useState(false);

  // Background image
  useEffect(() => {
    document.body.style.backgroundImage = `url("/images/escape-room-bg.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "0.5s ease";
    document.body.style.color = dark ? "#fff" : "#000";
  }, [dark]);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (timerOn && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0 && timerOn) {
      setTimerOn(false);
      alert("⏰ Time’s up!");
    }
    return () => clearInterval(interval);
  }, [timerOn, time]);

  const startTimer = () => {
    const t = parseInt(timeInput);
    if (isNaN(t) || t <= 0) return alert("Enter valid seconds");
    setTime(t);
    setTimerOn(true);
  };

  const handleSubmit = () => {
    let correct = false;
    if (stage === 1 && codeInput.includes("function") && codeInput.includes("Hello"))
      correct = true;
    if (stage === 2 && codeInput.includes("for") && codeInput.includes("console.log"))
      correct = true;
    if (stage === 3 && (codeInput.includes("map") || codeInput.includes("JSON")))
      correct = true;

    if (correct) {
      saveResult(codeInput);
      if (stage === 3) {
        setMessage("🎉 You escaped the room!");
      } else {
        setStage(stage + 1);
        setCodeInput("");
        setMessage(`Stage ${stage} completed! Proceed to Stage ${stage + 1}`);
      }
    } else {
      setMessage("❌ Incorrect code. Try again.");
    }
  };

  const saveResult = async (code: string) => {
    try {
      const res = await fetch("http://ec2-54-242-125-157.compute-1.amazonaws.com:4080/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Student21483818", code }),
      });
      if (res.ok) setSaved(true);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <Timer
        time={time}
        setTimeInput={timeInput}
        setTimeInputValue={setTimeInput}
        startTimer={startTimer}
        timerOn={timerOn}
      />
      {message.includes("escaped") ? (
        <EscapeComplete />
      ) : (
        <Stage
          stage={stage}
          dark={dark}
          codeInput={codeInput}
          setCodeInput={setCodeInput}
          handleSubmit={handleSubmit}
          message={message}
          saved={saved}
        />
      )}
    </div>
  );
}
