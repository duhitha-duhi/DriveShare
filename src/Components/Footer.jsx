import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, PhoneCall, MapPin, Compass } from "lucide-react";
import DriveShareLogo from "./DriveShareLogo";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      style={{
        background: isDark ? "var(--bg-base)" : "var(--bg-secondary)",
        borderTop: `1px solid ${isDark ? "var(--border-subtle)" : "var(--border-strong)"}`,
        padding: "50px 24px 30px",
        marginTop: "auto",
        position: "relative",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Concept Banner */}
        <div
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(18, 26, 41, 0.9) 0%, rgba(12, 18, 31, 0.9) 100%)"
              : "linear-gradient(135deg, #FFFFFF 0%, #E9EFF4 100%)",
            border: `1px solid ${isDark ? "var(--border-strong)" : "var(--border-subtle)"}`,
            borderRadius: "14px",
            padding: "24px 30px",
            marginBottom: "40px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.3)" : "0 4px 16px rgba(16,24,32,0.06)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.14em",
                color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)",
                textTransform: "uppercase",
                marginBottom: "6px",
                fontWeight: 600,
              }}
            >
              DRIVESHARE AUTOMOTIVE CHAUFFEUR PROTOCOL
            </div>
            <div
              style={{
                fontFamily: "var(--font-main)",
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--primary-text)",
              }}
            >
              We don't rent cars. We send verified chauffeurs to drive your own car.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--secondary-text)", fontSize: "13px" }}>
              <ShieldCheck size={18} style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)" }} />
              <span>Police & DL Verified</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--secondary-text)", fontSize: "13px" }}>
              <Award size={18} style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)" }} />
              <span>Defensive Driving Certified</span>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "36px",
            marginBottom: "40px",
          }}
        >
          <div>
            <div style={{ marginBottom: "16px" }}>
              <DriveShareLogo size="md" showTagline={true} />
            </div>
            <p
              style={{
                color: "var(--secondary-text)",
                fontSize: "13px",
                lineHeight: "1.7",
                marginBottom: "16px",
              }}
            >
              The premium driver-request platform for car owners. Request vetted, experienced professional chauffeurs to take the wheel of your own vehicle across Andhra Pradesh and Telangana.
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "6px",
                background: isDark ? "rgba(112, 182, 208, 0.08)" : "rgba(50, 96, 113, 0.08)",
                border: `1px solid ${isDark ? "rgba(112, 182, 208, 0.2)" : "rgba(50, 96, 113, 0.2)"}`,
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)",
              }}
            >
              YOUR CAR. YOUR JOURNEY. YOUR DRIVER.
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--primary-text)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Platform Navigation
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0 }}>
              <li>
                <Link to="/home" style={{ color: "var(--secondary-text)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>
                  Home Dashboard
                </Link>
              </li>
              <li>
                <Link to="/find-driver" style={{ color: "var(--secondary-text)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>
                  Find Driver by Location
                </Link>
              </li>
              <li>
                <Link to="/drivers" style={{ color: "var(--secondary-text)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>
                  Browse All Verified Drivers
                </Link>
              </li>
              <li>
                <Link to="/bookings" style={{ color: "var(--secondary-text)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>
                  My Trips & Requests
                </Link>
              </li>
              <li>
                <Link to="/profile" style={{ color: "var(--secondary-text)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>
                  Profile & Saved Vehicles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--primary-text)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Service Operations
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "var(--secondary-text)", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)", marginTop: "2px", flexShrink: 0 }} />
                <span>Tenali, Guntur, Vijayawada, Amaravati & Hyderabad Intercity Corridors</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <PhoneCall size={16} style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)", flexShrink: 0 }} />
                <span>24x7 Driver Dispatch: +91 98480 00000</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Compass size={16} style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)", flexShrink: 0 }} />
                <span>Hourly • Outstation • Day Packages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: `1px solid ${isDark ? "var(--border-subtle)" : "var(--border-strong)"}`,
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            color: "var(--secondary-text)",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div>
            © {new Date().getFullYear()} DRIVESHARE TECHNOLOGIES. ALL RIGHTS RESERVED.
          </div>
          <div>
            CHASSIS // FRONTEND DEMO VERIFICATION SYSTEM
          </div>
        </div>
      </div>
    </footer>
  );
}
