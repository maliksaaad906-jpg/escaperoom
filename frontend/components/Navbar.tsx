"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark" : "navbar-light"
      } glassy-navbar sticky-top`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand fw-bold" href="/">
          🧩 Escape Room
        </a>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-secondary theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <span className="fw-semibold">Student No: 21483818</span>
        </div>
      </div>
    </nav>
  );
}
