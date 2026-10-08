import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Languages,
  Gauge,
  Send,
} from "lucide-react";

export default function DriverCard({ driver }) {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // ======================================================
  // VIEW DRIVER PROFILE
  // ======================================================

  const handleViewProfile = () => {
    navigate(`/driver-profile/${driver.id}`);
  };

  // ======================================================
  // SEND DRIVER REQUEST
  // ======================================================

  const handleSendRequest = () => {
    navigate("/request-driver", {
      state: {
        driverId: driver.id,
        driver: driver,
      },
    });
  };

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        borderRadius: "14px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "20px",
        transition:
          "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        boxShadow: "var(--shadow-main)",
      }}
      className="card-hover-lift"
    >

      {/* ==================================================
          TOP SECTION
      ================================================== */}

      <div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "16px",
          }}
        >

          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >

            {/* AVATAR */}

            <div
              style={{
                position: "relative",
                width: "64px",
                height: "64px",
                borderRadius: "12px",
                overflow: "hidden",
                border:
                  "1px solid var(--blue-teal)",
                flexShrink: 0,
                background: "var(--bg-main)",
              }}
            >

              <img
                src={driver.avatar}
                alt={driver.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "3px",
                  right: "3px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  border:
                    "2px solid var(--bg-main)",
                }}
                title={driver.availability}
              />

            </div>

            {/* DRIVER INFO */}

            <div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                  flexWrap: "wrap",
                }}
              >

                <h3
                  style={{
                    fontFamily: "var(--font-main)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--primary-text)",
                    margin: 0,
                  }}
                >
                  {driver.name}
                </h3>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: "var(--cyan-dim)",
                    border:
                      "1px solid var(--border-color)",
                    color: "var(--cyan-accent)",
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                  }}
                >
                  <ShieldCheck size={12} />
                  VERIFIED
                </span>

              </div>

              {/* RATING */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--secondary-text)",
                  fontSize: "12px",
                }}
              >

                <Star
                  size={13}
                  style={{
                    color: "#facc15",
                    fill: "#facc15",
                  }}
                />

                <strong
                  style={{
                    color: "var(--primary-text)",
                  }}
                >
                  {driver.rating}
                </strong>

                <span>
                  ({driver.reviewCount} reviews)
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* BIO */}

        <p
          style={{
            color: "var(--secondary-text)",
            fontSize: "13px",
            lineHeight: "1.6",
            margin: "0 0 16px",
          }}
        >
          {driver.bio}
        </p>

        {/* TECHNICAL SPECS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            background: "var(--bg-main)",
            border:
              "1px solid var(--border-color)",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "16px",
            fontSize: "12px",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--secondary-text)",
            }}
          >
            <Clock
              size={13}
              style={{
                color: "var(--cyan-accent)",
              }}
            />

            <span>
              {driver.experience}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--secondary-text)",
            }}
          >
            <MapPin
              size={13}
              style={{
                color: "var(--cyan-accent)",
              }}
            />

            <span>
              {driver.distance}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--secondary-text)",
            }}
          >
            <Languages
              size={13}
              style={{
                color: "var(--cyan-accent)",
              }}
            />

            <span>
              {driver.languages
                ? driver.languages.join(", ")
                : "English, Telugu"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--secondary-text)",
            }}
          >
            <Gauge
              size={13}
              style={{
                color: "var(--cyan-accent)",
              }}
            />

            <span>
              Manual / Auto
            </span>
          </div>

        </div>

        {/* EXPERTISE */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "18px",
          }}
        >

          {(
            driver.vehicleExpertise || [
              "Luxury SUVs",
              "Automatic",
              "Manual",
            ]
          )
            .slice(0, 3)
            .map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  background: "var(--cyan-dim)",
                  border:
                    "1px solid var(--border-color)",
                  color: "var(--primary-text)",
                }}
              >
                {tag}
              </span>
            ))}

        </div>

      </div>

      {/* ==================================================
          BOTTOM SERVICE PRICE & ACTION
      ================================================== */}

      <div
        style={{
          borderTop:
            "1px solid var(--border-color)",
          paddingTop: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >

        {/* PRICE */}

        <div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--secondary-text)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            DRIVER SERVICE FEE
          </div>

          <div
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "18px",
              fontWeight: 800,
              color: "var(--cyan-accent)",
            }}
          >
            {driver.price}
          </div>

        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >

          {/* VIEW PROFILE */}

          <button
            type="button"
            className="ds-btn-secondary"
            style={{
              padding: "10px 14px",
              fontSize: "12px",
            }}
            onClick={handleViewProfile}
          >
            View Profile
          </button>

          {/* SEND REQUEST */}

          <button
            type="button"
            className="ds-btn-primary"
            style={{
              padding: "10px 16px",
              fontSize: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
            }}
            onClick={handleSendRequest}
          >
            <span>Send Request</span>
            <Send size={13} />
          </button>

        </div>

      </div>

    </div>
  );
}