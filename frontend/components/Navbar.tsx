"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow-sm sticky-top`}
    >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">
          🚀 Escape Room
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/escape-room">
                Game
              </a>
            </li>
            <li className="nav-item">
              <ThemeToggle />
            </li>
            <li className="nav-item ps-3">
                 21483818
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}
