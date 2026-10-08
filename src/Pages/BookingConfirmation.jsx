import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Navigation,
  Phone,
  KeyRound,
} from "lucide-react";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [booking, setBooking] = useState(null);

  // Live Trip status simulation (Section 27)
  const [tripStatus, setTripStatus] = useState("DRIVER ON THE WAY");
  const [eta, setEta] = useState(6);

  useEffect(() => {
    if (location.state?.booking) {
      setBooking(location.state.booking);
    } else {
      const saved = localStorage.getItem("driveShareLatestBooking");
      if (saved) {
        setBooking(JSON.parse(saved));
      } else {
        setBooking({
          id: "DS-2026-9041",
          driver: "Rahul Kumar",
          driverPhone: "+91 98480 23145",
          vehicle: "Toyota Fortuner 2.8L 4x4 (AP 07 CK 4589)",
          pickup: "Morrispet Main Road, Tenali",
          destination: "Banjara Hills, Hyderabad",
          date: "2026-10-12",
          time: "07:30 AM",
          price: "₹1,850",
          status: "Confirmed",
          tripType: "Outstation (One Way)",
        });
      }
    }
  }, [location.state]);

  if (!booking) return null;

  return (
    <div
      style={{
        background: "var(--bg-base)",
        color: "var(--primary-text)",
        minHeight: "100vh",
        padding: "50px 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "680px", width: "100%" }}>
        {/* Animated Holographic Success Badge */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "var(--cyan-dim)",
              border: "2px solid var(--cyan-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--cyan-accent)",
              margin: "0 auto 20px",
              boxShadow: isDark ? "0 0 35px rgba(112, 182, 208, 0.35)" : "none",
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <div className="tech-label" style={{ marginBottom: "6px" }}>
            DISPATCH ASSIGNMENT CONFIRMED //
          </div>

          <h1
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "34px",
              fontWeight: 800,
              color: "var(--primary-text)",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            {tripStatus === "TRIP COMPLETED" ? "TRIP COMPLETED ✓" : "DRIVER CONFIRMED ✓"}
          </h1>

          <p style={{ color: "var(--secondary-text)", fontSize: "15px" }}>
            {tripStatus === "TRIP COMPLETED"
              ? "Your journey in your own vehicle has been completed successfully."
              : "Your verified driver is on the way to your pickup address."}
          </p>
        </div>

        {/* Confirmation Card Container */}
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "20px",
            padding: "36px 32px",
            boxShadow: "var(--shadow-main)",
            marginBottom: "32px",
            position: "relative",
          }}
        >
          {/* Booking ID & Live Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "20px",
              borderBottom: "1px dashed var(--border-color)",
              marginBottom: "24px",
            }}
          >
            <div>
              <span style={{ fontSize: "11px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                DISPATCH ID
              </span>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--cyan-accent)",
                }}
              >
                {booking.id}
              </div>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "20px",
                background: "rgba(74, 222, 128, 0.12)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                color: "#4ade80",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
              }}
            >
              <span className="status-dot" style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
              <span>{tripStatus}</span>
            </div>
          </div>

          {/* Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Driver */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--bg-main)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "16px 20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "var(--blue-teal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontWeight: 700,
                  }}
                >
                  <User size={22} />
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)" }}>
                    ASSIGNED CHAUFFEUR
                  </span>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--primary-text)" }}>
                    {booking.driver}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: "var(--cyan-dim)",
                    color: "var(--cyan-accent)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  ETA: {eta} MIN
                </span>
                <div style={{ fontSize: "12px", color: "var(--secondary-text)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
                  {booking.driverPhone}
                </div>
              </div>
            </div>

            {/* Vehicle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                background: "var(--bg-main)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "var(--cyan-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cyan-accent)",
                }}
              >
                <Car size={22} />
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)" }}>
                  VEHICLE TO BE DRIVEN (OWNER'S CAR)
                </span>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--primary-text)" }}>
                  {booking.vehicle}
                </div>
              </div>
            </div>

            {/* Route */}
            <div
              style={{
                background: "var(--bg-main)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                <MapPin size={18} style={{ color: "var(--cyan-accent)", marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: "11px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)" }}>
                    PICKUP ADDRESS
                  </span>
                  <div style={{ fontSize: "14px", color: "var(--primary-text)", fontWeight: 600 }}>
                    {booking.pickup}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <Navigation size={18} style={{ color: "var(--teal-muted)", marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: "11px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)" }}>
                    DESTINATION
                  </span>
                  <div style={{ fontSize: "14px", color: "var(--primary-text)", fontWeight: 600 }}>
                    {booking.destination}
                  </div>
                </div>
              </div>
            </div>

            {/* Fee */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div
                style={{
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                }}
              >
                <span style={{ fontSize: "11px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)" }}>
                  SCHEDULED TIME
                </span>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary-text)", marginTop: "2px" }}>
                  {booking.date} • {booking.time}
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                }}
              >
                <span style={{ fontSize: "11px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)" }}>
                  DRIVER SERVICE FEE
                </span>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "var(--cyan-accent)",
                    fontFamily: "var(--font-mono)",
                    marginTop: "2px",
                  }}
                >
                  {booking.price}
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Controls (Section 27) */}
          <div
            style={{
              marginTop: "24px",
              padding: "14px 18px",
              background: "var(--bg-main)",
              border: "1px dashed var(--border-color)",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "11px", color: "var(--secondary-text)", fontFamily: "var(--font-mono)", marginBottom: "8px" }}>
              SIMULATION CONTROLS
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => {
                  setTripStatus("DRIVER ARRIVED");
                  setEta(0);
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  background: tripStatus === "DRIVER ARRIVED" ? "var(--cyan-dim)" : "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  color: "var(--primary-text)",
                  cursor: "pointer",
                }}
              >
                Driver Arrived
              </button>
              <button
                type="button"
                onClick={() => setTripStatus("TRIP IN PROGRESS")}
                style={{
                  padding: "6px 10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  background: tripStatus === "TRIP IN PROGRESS" ? "var(--cyan-dim)" : "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  color: "var(--primary-text)",
                  cursor: "pointer",
                }}
              >
                Start Trip
              </button>
              <button
                type="button"
                onClick={() => setTripStatus("TRIP COMPLETED")}
                style={{
                  padding: "6px 10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  background: tripStatus === "TRIP COMPLETED" ? "var(--cyan-dim)" : "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  color: "var(--primary-text)",
                  cursor: "pointer",
                }}
              >
                Complete Trip
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            className="ds-btn-primary"
            onClick={() => navigate("/bookings")}
            style={{ padding: "14px 28px", fontSize: "14px" }}
          >
            <span>VIEW MY TRIPS</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className="ds-btn-secondary"
            onClick={() => navigate("/home")}
            style={{ padding: "14px 28px", fontSize: "14px" }}
          >
            <span>BACK TO HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
}
