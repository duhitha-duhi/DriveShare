import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ showLabel = false, className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: showLabel ? "6px 12px" : "8px",
        borderRadius: "8px",
        background: isDark ? "rgba(18, 26, 41, 0.8)" : "#E9EFF4",
        border: `1px solid ${isDark ? "#26384A" : "#D3DEE6"}`,
        color: isDark ? "#70B6D0" : "#326071",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
      }}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <>
          <Moon size={16} />
          {showLabel && <span>Dark</span>}
        </>
      ) : (
        <>
          <Sun size={16} />
          {showLabel && <span>Light</span>}
        </>
      )}
    </button>
  );
}