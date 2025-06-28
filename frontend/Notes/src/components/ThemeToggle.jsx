// components/ThemeToggle.jsx
import React, { useEffect, useState, useRef } from "react";
import { ChevronDownIcon } from "lucide-react";

const themes = ["light", "dark", "forest"];

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState("forest");
  const dropdownRef = useRef(null);

  // Initialize from localStorage or default
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "forest";
    applyTheme(saved);
  }, []);

  const applyTheme = (theme) => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    applyTheme(nextTheme);
  };

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("hidden");
    }
  };

  const selectTheme = (theme) => {
    applyTheme(theme);
    toggleDropdown(); // hide dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex">
        <button
          onClick={cycleTheme}
          className="btn btn-outline rounded-r-none"
        >
          {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
        </button>
        <button
          className="btn btn-outline rounded-l-none"
          onClick={toggleDropdown}
        >
          <ChevronDownIcon size={10} />
        </button>
      </div>

      {/* Dropdown Menu */}
      <ul
        ref={dropdownRef}
        className="absolute right-0 mt-1 z-10 menu bg-base-100 shadow-lg rounded-box w-36 hidden"
      >
        {themes.map((theme) => (
          <li key={theme}>
            <button
              onClick={() => selectTheme(theme)}
              className={theme === currentTheme ? "active" : ""}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
