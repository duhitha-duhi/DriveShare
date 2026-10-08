import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function DriveShareLogo({
  size = "md",
  showTagline = false,
  className = "",
  style = {},
}) {
  const { isDark } = useTheme();

  // Size configurations maintaining strict vector proportions
  const config = {
    sm: { symbolWidth: 26, symbolHeight: 28, fontSize: "16px", taglineSize: "7px", gap: "8px" },
    md: { symbolWidth: 32, symbolHeight: 34, fontSize: "20px", taglineSize: "8px", gap: "10px" },
    lg: { symbolWidth: 42, symbolHeight: 45, fontSize: "26px", taglineSize: "9px", gap: "12px" },
    xl: { symbolWidth: 54, symbolHeight: 58, fontSize: "32px", taglineSize: "10.5px", gap: "14px" },
  }[size] || { symbolWidth: 32, symbolHeight: 34, fontSize: "20px", taglineSize: "8px", gap: "10px" };

  const primaryTextColor = isDark ? "#FFFFFF" : "#101820";
  const accentColor = isDark ? "#70B6D0" : "#326071";
  const taglineColor = isDark ? "#94A4B5" : "#52616D";

  return (
    <div
      className={`driveshare-brand-logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: config.gap,
        userSelect: "none",
        textDecoration: "none",
        ...style,
      }}
    >
      {/* Official DriveShare Brand Symbol: Aerodynamic Road Convergence (NO SHIELD, NO CAR ICON) */}
      <svg
        width={config.symbolWidth}
        height={config.symbolHeight}
        viewBox="0 0 56 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          flexShrink: 0,
          filter: isDark ? "drop-shadow(0 0 8px rgba(112, 182, 208, 0.35))" : "none",
          transition: "filter 0.25s ease",
        }}
      >
        <defs>
          <linearGradient id={`dsRoadL-${size}`} x1="6" y1="52" x2="28" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#326071" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#70B6D0" />
            <stop offset="100%" stopColor="#E8F0F7" />
          </linearGradient>
          <linearGradient id={`dsRoadR-${size}`} x1="50" y1="52" x2="28" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#326071" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#70B6D0" />
            <stop offset="100%" stopColor="#E8F0F7" />
          </linearGradient>
          <linearGradient id={`dsCenter-${size}`} x1="28" y1="52" x2="28" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#70B6D0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <radialGradient id={`dsApex-${size}`} cx="28" cy="12" r="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#70B6D0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#70B6D0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Horizon Glow */}
        <circle cx="28" cy="12" r="11" fill={`url(#dsApex-${size})`} />

        {/* Left Aerodynamic Highway Arc Ribbon */}
        <path
          d="M8 48C14 42 22 28 26 12C26.8 8.8 28 8.8 28.5 12C26.5 28 17 45 12 50C10.5 51.5 8 50.5 8 48Z"
          fill={`url(#dsRoadL-${size})`}
        />

        {/* Right Aerodynamic Highway Arc Ribbon */}
        <path
          d="M48 48C42 42 34 28 30 12C29.2 8.8 28 8.8 27.5 12C29.5 28 39 45 44 50C45.5 51.5 48 50.5 48 48Z"
          fill={`url(#dsRoadR-${size})`}
        />

        {/* Dual Converging Highway Guideway Lines */}
        <path d="M14 48L26 14" stroke="#70B6D0" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 48L30 14" stroke="#70B6D0" strokeWidth="2" strokeLinecap="round" />

        {/* Center Photon Road Trajectory Markers */}
        <line x1="28" y1="48" x2="28" y2="40" stroke={`url(#dsCenter-${size})`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="34" x2="28" y2="28" stroke={`url(#dsCenter-${size})`} strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="24" x2="28" y2="20" stroke={`url(#dsCenter-${size})`} strokeWidth="1.5" strokeLinecap="round" />

        {/* Apex Horizon Light Beacon */}
        <circle cx="28" cy="12" r="2.5" fill="#FFFFFF" />
        <circle cx="28" cy="12" r="5" stroke="#70B6D0" strokeWidth="1" strokeOpacity="0.8" />
      </svg>

      {/* Official DriveShare Wordmark & Optional Tagline */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "var(--font-main)",
            fontSize: config.fontSize,
            fontWeight: 900,
            letterSpacing: "0.06em",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ color: primaryTextColor, transition: "color 0.2s ease" }}>DRIVE</span>
          <span style={{ color: accentColor, marginLeft: "2px", transition: "color 0.2s ease" }}>SHARE</span>
        </div>

        {showTagline && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: config.taglineSize,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: taglineColor,
              marginTop: "4px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              transition: "color 0.2s ease",
            }}
          >
            YOUR CAR. YOUR JOURNEY. YOUR DRIVER.
          </div>
        )}
      </div>
    </div>
  );
}
