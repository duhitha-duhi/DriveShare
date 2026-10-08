import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DriveShareLogo from "./DriveShareLogo";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  Compass,
  Search,
  Users,
  CalendarCheck,
  User,
  Bell,
  MapPin,
  Menu,
  X,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const isAuthPage = location.pathname === "/" || location.pathname === "/otp";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/home", icon: Compass },
    { label: "Request Driver", path: "/find-driver", icon: Search },
    { label: "Drivers", path: "/drivers", icon: Users },
    { label: "My Trips", path: "/bookings", icon: CalendarCheck },
    { label: "Profile", path: "/profile", icon: User },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: isDark
          ? (isScrolled ? "var(--glass-bg)" : "transparent")
          : (isScrolled ? "rgba(255, 255, 255, 0.94)" : "rgba(255, 255, 255, 0.88)"),
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${isDark ? (isScrolled ? "var(--border-color)" : "transparent") : "#D3DEE6"}`,
        boxShadow: !isDark && isScrolled ? "0 4px 20px rgba(16, 24, 32, 0.04)" : "none",
        transition: "all 0.25s ease",
        padding: isScrolled ? "10px 0" : "16px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Official Brand Logo (Compact Navbar Version) */}
        <Link
          to={isLoggedIn ? "/home" : "/"}
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <DriveShareLogo size="md" showTagline={false} />
        </Link>

        {/* Desktop Navigation Links */}
        {!isAuthPage && (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="desktop-nav-menu"
          >
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 500,
                    fontFamily: "var(--font-main)",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                    color: isActive
                      ? (isDark ? "var(--cyan-accent)" : "#326071")
                      : (isDark ? "var(--secondary-text)" : "#52616D"),
                    background: isActive
                      ? isDark
                        ? "rgba(112, 182, 208, 0.08)"
                        : "rgba(50, 96, 113, 0.08)"
                      : "transparent",
                    border: isActive
                      ? `1px solid ${isDark ? "rgba(112, 182, 208, 0.25)" : "rgba(50, 96, 113, 0.2)"}`
                      : "1px solid transparent",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <item.icon size={15} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section: Theme Toggle, Location Badge, Profile, Mobile Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Functional Theme Toggle */}
          <ThemeToggle />

          {/* Quick Location indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "20px",
              background: isDark ? "var(--bg-surface)" : "#FFFFFF",
              border: isDark ? "1px solid var(--border-color)" : "1px solid #D3DEE6",
              color: isDark ? "var(--secondary-text)" : "#52616D",
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
            }}
            className="navbar-location-pill"
          >
            <MapPin size={13} style={{ color: isDark ? "var(--cyan-accent)" : "#326071" }} />
            <span>AP & Telangana</span>
          </div>

          {/* Profile Quick Link */}
          {!isAuthPage && (
            <Link
              to="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 10px 4px 6px",
                borderRadius: "20px",
                background: isDark ? "var(--bg-surface)" : "#FFFFFF",
                border: isDark ? "1px solid var(--border-color)" : "1px solid #D3DEE6",
                textDecoration: "none",
                color: isDark ? "var(--primary-text)" : "#101820",
                boxShadow: isDark ? "none" : "0 2px 8px rgba(16, 24, 32, 0.04)",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#326071",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  border: isDark ? "1px solid var(--cyan-accent)" : "1px solid rgba(50, 96, 113, 0.3)",
                }}
              >
                GD
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "var(--font-main)",
                }}
                className="navbar-username"
              >
                Gavini D.
              </span>
            </Link>
          )}

          {/* If on Auth page and already logged in, quick dashboard button */}
          {isAuthPage && isLoggedIn && (
            <Link
              to="/home"
              className="ds-btn-primary"
              style={{ padding: "8px 16px", fontSize: "12px" }}
            >
              Open App →
            </Link>
          )}

          {/* Mobile hamburger button */}
          {!isAuthPage && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-color)",
                color: "var(--primary-text)",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              className="mobile-hamburger-btn"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && !isAuthPage && (
        <div
          style={{
            background: "var(--bg-main)",
            borderTop: "1px solid var(--border-color)",
            borderBottom: "1px solid var(--border-color)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isActive ? "var(--cyan-accent)" : "var(--primary-text)",
                  background: isActive ? "var(--cyan-dim)" : "transparent",
                  border: isActive ? "1px solid var(--cyan-accent)" : "1px solid transparent",
                  textDecoration: "none",
                }}
              >
                <item.icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div style={{ height: "1px", background: "var(--border-color)", margin: "8px 0" }} />

          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#f87171",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </header>
  );
}