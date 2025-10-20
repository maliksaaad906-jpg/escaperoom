"use client";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`btn btn-sm ${
        theme === "dark" ? "btn-light" : "btn-dark"
      } ms-3`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
