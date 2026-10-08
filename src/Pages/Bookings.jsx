import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_BOOKINGS } from "../data/mockDrivers";
import { useTheme } from "../context/ThemeContext";
import {
  CalendarCheck,
  Clock,
  MapPin,
  Car,
  User,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Receipt,
  Phone,
  Navigation,
  Activity,
} from "lucide-react";

export default function Bookings() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("driveShareBookings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error reading bookings from localStorage", e);
      }
    }
    // Initialize with default rich mock bookings
    localStorage.setItem("driveShareBookings", JSON.stringify(DEFAULT_BOOKINGS));
    return DEFAULT_BOOKINGS;
  });

  const tabs = ["Upcoming", "Active", "Completed", "Cancelled"];

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "Upcoming") return b.status === "Upcoming" || b.status === "Confirmed";
    if (activeTab === "Active") return b.status === "Active" || b.status === "In Progress";
    if (activeTab === "Completed") return b.status === "Completed";
    if (activeTab === "Cancelled") return b.status === "Cancelled";
    return true;
  });

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this driver dispatch request?")) {
      const updated = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "Cancelled" } : b
      );
      setBookings(updated);
      localStorage.setItem("driveShareBookings", JSON.stringify(updated));
      if (selectedBookingDetails?.id === bookingId) {
        setSelectedBookingDetails(null);
      }
    }
  };

  return (
    <div
      style={{
        background: isDark ? "var(--bg-base)" : "var(--bg-secondary)",
        color: "var(--primary-text)",
        minHeight: "100vh",
        padding: "40px 24px 80px",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <div
            className="tech-label"
            style={{
              marginBottom: "8px",
              color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)",
            }}
          >
            DISPATCH ARCHIVE //
          </div>
          <h1
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "36px",
              fontWeight: 800,
              color: "var(--primary-text)",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            My Trips & Driver Requests
          </h1>
          <p style={{ color: "var(--secondary-text)", fontSize: "15px" }}>
            Track assigned verified drivers, scheduled routes, and live trip status for your personal vehicles.
          </p>
        </div>

        {/* Tab Filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: `1px solid ${isDark ? "var(--border-subtle)" : "var(--border-strong)"}`,
            paddingBottom: "16px",
            marginBottom: "32px",
            overflowX: "auto",
          }}
        >
          {tabs.map((tab) => {
            const count = bookings.filter((b) => {
              if (tab === "Upcoming") return b.status === "Upcoming" || b.status === "Confirmed";
              if (tab === "Active") return b.status === "Active" || b.status === "In Progress";
              if (tab === "Completed") return b.status === "Completed";
              if (tab === "Cancelled") return b.status === "Cancelled";
              return false;
            }).length;

            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  background: isActive
                    ? isDark
                      ? "rgba(112, 182, 208, 0.15)"
                      : "rgba(50, 96, 113, 0.12)"
                    : "transparent",
                  border: isActive
                    ? `1px solid ${isDark ? "var(--cyan-accent)" : "var(--blue-teal)"}`
                    : "1px solid transparent",
                  color: isActive
                    ? isDark
                      ? "var(--cyan-accent)"
                      : "var(--blue-teal)"
                    : "var(--secondary-text)",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                <span>{tab}</span>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "2px 7px",
                    borderRadius: "10px",
                    background: isActive
                      ? isDark
                        ? "var(--blue-teal)"
                        : "var(--blue-teal)"
                      : isDark
                      ? "var(--bg-surface)"
                      : "rgba(16, 24, 32, 0.08)",
                    color: isActive ? "#FFFFFF" : "var(--secondary-text)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bookings List or Empty State */}
        {filteredBookings.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                style={{
                  background: isDark ? "rgba(18, 26, 41, 0.85)" : "#FFFFFF",
                  border: `1px solid ${isDark ? "var(--border-strong)" : "var(--border-subtle)"}`,
                  borderRadius: "16px",
                  padding: "24px 28px",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.6fr 1fr auto",
                  gap: "24px",
                  alignItems: "center",
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0,0,0,0.2)"
                    : "0 4px 16px rgba(16,24,32,0.04)",
                  transition: "all 0.25s ease",
                }}
                className="booking-row-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isDark ? "var(--cyan-accent)" : "var(--blue-teal)";
                  e.currentTarget.style.boxShadow = isDark
                    ? "0 10px 30px rgba(0,0,0,0.5)"
                    : "0 8px 24px rgba(16,24,32,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? "var(--border-strong)" : "var(--border-subtle)";
                  e.currentTarget.style.boxShadow = isDark
                    ? "0 4px 20px rgba(0,0,0,0.2)"
                    : "0 4px 16px rgba(16,24,32,0.04)";
                }}
              >
                {/* 1. Driver & Status */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)",
                      }}
                    >
                      {b.id}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "2px 7px",
                        borderRadius: "4px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        background:
                          b.status === "Completed"
                            ? "rgba(74, 222, 128, 0.12)"
                            : b.status === "Cancelled"
                            ? "rgba(239, 68, 68, 0.12)"
                            : isDark
                            ? "rgba(112, 182, 208, 0.15)"
                            : "rgba(50, 96, 113, 0.12)",
                        color:
                          b.status === "Completed"
                            ? "#4ade80"
                            : b.status === "Cancelled"
                            ? "#f87171"
                            : isDark
                            ? "var(--cyan-accent)"
                            : "var(--blue-teal)",
                        border:
                          b.status === "Completed"
                            ? "1px solid rgba(74, 222, 128, 0.3)"
                            : b.status === "Cancelled"
                            ? "1px solid rgba(239, 68, 68, 0.3)"
                            : `1px solid ${isDark ? "rgba(112, 182, 208, 0.3)" : "rgba(50, 96, 113, 0.3)"}`,
                      }}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "10px",
                        background: isDark ? "var(--blue-teal)" : "#E9EFF4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isDark ? "#FFFFFF" : "var(--blue-teal)",
                        flexShrink: 0,
                      }}
                    >
                      <User size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--primary-text)" }}>
                        {b.driver}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)" }}>
                        {b.driverPhone || "+91 98480 23145"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Journey & Vehicle */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <Car size={15} style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)" }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--primary-text)" }}>
                      {b.vehicle}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--secondary-text)" }}>
                    <span style={{ color: "var(--primary-text)", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {b.pickup}
                    </span>
                    <span style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)" }}>→</span>
                    <span style={{ color: "var(--primary-text)", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {b.destination}
                    </span>
                  </div>
                </div>

                {/* 3. Schedule & Price */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--secondary-text)", marginBottom: "4px" }}>
                    <Clock size={13} style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)" }} />
                    <span>{b.date} • {b.time}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "18px",
                      fontWeight: 800,
                      color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)",
                    }}
                  >
                    {b.price}
                  </div>
                </div>

                {/* 4. Actions */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  {(b.status === "Upcoming" || b.status === "Confirmed" || b.status === "Active") && (
                    <button
                      type="button"
                      className="ds-btn-primary"
                      style={{ padding: "8px 14px", fontSize: "12px" }}
                      onClick={() => navigate("/request/drv-1")}
                    >
                      <Activity size={14} />
                      <span>Live Status</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="ds-btn-secondary"
                    style={{ padding: "8px 14px", fontSize: "12px" }}
                    onClick={() => setSelectedBookingDetails(b)}
                  >
                    View Details
                  </button>

                  {(b.status === "Upcoming" || b.status === "Confirmed") && (
                    <button
                      type="button"
                      onClick={() => handleCancelBooking(b.id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        color: "#f87171",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                      title="Cancel Trip Request"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              background: isDark ? "rgba(18, 26, 41, 0.6)" : "#FFFFFF",
              border: `1px solid ${isDark ? "var(--border-strong)" : "var(--border-subtle)"}`,
              borderRadius: "16px",
              padding: "60px 24px",
              textAlign: "center",
              maxWidth: "500px",
              margin: "0 auto",
              boxShadow: isDark ? "none" : "0 4px 16px rgba(16,24,32,0.04)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: isDark ? "rgba(50, 96, 113, 0.2)" : "rgba(50, 96, 113, 0.1)",
                border: `1px solid ${isDark ? "var(--border-strong)" : "var(--border-subtle)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)",
                margin: "0 auto 16px",
              }}
            >
              <CalendarCheck size={26} />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "var(--primary-text)" }}>
              No {activeTab} Trips Found
            </h3>
            <p style={{ color: "var(--secondary-text)", fontSize: "14px", marginBottom: "24px" }}>
              You do not have any driver requests recorded under the "{activeTab}" tab.
            </p>
            <button
              type="button"
              className="ds-btn-primary"
              onClick={() => navigate("/find-driver")}
              style={{ padding: "12px 24px", fontSize: "13px" }}
            >
              <span>REQUEST A DRIVER</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Modal: Booking Details View */}
        {selectedBookingDetails && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "20px",
            }}
            onClick={() => setSelectedBookingDetails(null)}
          >
            <div
              style={{
                background: isDark ? "var(--bg-secondary)" : "#FFFFFF",
                border: `1px solid ${isDark ? "var(--cyan-accent)" : "var(--blue-teal)"}`,
                borderRadius: "20px",
                padding: "36px",
                maxWidth: "560px",
                width: "100%",
                boxShadow: isDark
                  ? "0 25px 60px rgba(0,0,0,0.9)"
                  : "0 20px 50px rgba(16,24,32,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  paddingBottom: "14px",
                  borderBottom: `1px solid ${isDark ? "var(--border-strong)" : "var(--border-subtle)"}`,
                }}
              >
                <div>
                  <div
                    className="tech-label"
                    style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)" }}
                  >
                    DISPATCH SPEC SHEET //
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary-text)", margin: 0 }}>
                    {selectedBookingDetails.id}
                  </h3>
                </div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "4px",
                    background: isDark ? "rgba(112, 182, 208, 0.15)" : "rgba(50, 96, 113, 0.1)",
                    border: `1px solid ${isDark ? "var(--cyan-accent)" : "var(--blue-teal)"}`,
                    color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                  }}
                >
                  {selectedBookingDetails.status}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px", color: "var(--secondary-text)", marginBottom: "24px" }}>
                <div>
                  <strong style={{ color: "var(--primary-text)" }}>Assigned Driver: </strong>
                  <span>{selectedBookingDetails.driver}</span>
                </div>
                <div>
                  <strong style={{ color: "var(--primary-text)" }}>Client Vehicle: </strong>
                  <span>{selectedBookingDetails.vehicle}</span>
                </div>
                <div>
                  <strong style={{ color: "var(--primary-text)" }}>Pickup Address: </strong>
                  <span>{selectedBookingDetails.pickup}</span>
                </div>
                <div>
                  <strong style={{ color: "var(--primary-text)" }}>Destination: </strong>
                  <span>{selectedBookingDetails.destination}</span>
                </div>
                <div>
                  <strong style={{ color: "var(--primary-text)" }}>Date & Time: </strong>
                  <span>{selectedBookingDetails.date} at {selectedBookingDetails.time}</span>
                </div>
                <div>
                  <strong style={{ color: "var(--primary-text)" }}>Total Driver Fee: </strong>
                  <span style={{ color: isDark ? "var(--cyan-accent)" : "var(--blue-teal)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                    {selectedBookingDetails.price}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  className="ds-btn-secondary"
                  onClick={() => setSelectedBookingDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}