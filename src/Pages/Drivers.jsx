
import React, { useState } from "react";
import DriverCard from "../Components/DriverCard";
import { MOCK_DRIVERS } from "../data/mockDrivers";
import { useTheme } from "../context/ThemeContext";
import {
  Search,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function Drivers() {
  const { isDark } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("All");
  const [filterExpertise, setFilterExpertise] = useState("All");

  const cities = [
    "All",
    "Tenali",
    "Guntur",
    "Vijayawada",
  ];

  const expertiseList = [
    "All",
    "Luxury SUVs",
    "Automatic",
    "Manual",
    "EVs",
  ];

  // FILTER DRIVERS
  const filtered = MOCK_DRIVERS.filter((driver) => {
    const text = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !text ||
      driver.name.toLowerCase().includes(text) ||
      driver.location.toLowerCase().includes(text) ||
      driver.experience.toLowerCase().includes(text);

    const matchesCity =
      filterCity === "All" ||
      driver.location
        .toLowerCase()
        .includes(filterCity.toLowerCase()) ||
      driver.serviceAreas.some((area) =>
        area.toLowerCase().includes(filterCity.toLowerCase())
      );

    const matchesExpertise =
      filterExpertise === "All" ||
      driver.vehicleExpertise.some((expertise) =>
        expertise
          .toLowerCase()
          .includes(filterExpertise.toLowerCase())
      );

    return (
      matchesSearch &&
      matchesCity &&
      matchesExpertise
    );
  });

  return (
    <div
      style={{
        background: isDark
          ? "var(--bg-base)"
          : "var(--bg-secondary)",
        color: "var(--primary-text)",
        minHeight: "100vh",
        padding: "40px 24px 80px",
        transition:
          "background 0.3s ease, color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >

        {/* ================= HEADER ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div
              className="tech-label"
              style={{
                marginBottom: "8px",
                color: isDark
                  ? "var(--cyan-accent)"
                  : "var(--blue-teal)",
              }}
            >
              LICENSED CHAUFFEURS //
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
              Certified Driver Directory
            </h1>

            <p
              style={{
                color: "var(--secondary-text)",
                fontSize: "15px",
                maxWidth: "600px",
                lineHeight: "1.6",
              }}
            >
              Every driver in the DriveShare network passes
              RTO license verification, background checks,
              and client vehicle courtesy standards.
            </p>
          </div>

          {/* ================= TRUST GUARANTEES ================= */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: isDark
                ? "rgba(18, 26, 41, 0.75)"
                : "#FFFFFF",
              border: `1px solid ${
                isDark
                  ? "var(--border-strong)"
                  : "var(--border-subtle)"
              }`,
              borderRadius: "12px",
              padding: "12px 20px",
              boxShadow: isDark
                ? "none"
                : "0 4px 16px rgba(16,24,32,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "var(--secondary-text)",
              }}
            >
              <ShieldCheck
                size={16}
                style={{
                  color: isDark
                    ? "var(--cyan-accent)"
                    : "var(--blue-teal)",
                }}
              />

              <span>100% Background Checked</span>
            </div>

            <div
              style={{
                width: "1px",
                height: "16px",
                background: isDark
                  ? "var(--border-strong)"
                  : "var(--border-subtle)",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "var(--secondary-text)",
              }}
            >
              <Award
                size={16}
                style={{
                  color: isDark
                    ? "var(--cyan-accent)"
                    : "var(--blue-teal)",
                }}
              />

              <span>Zero Rash-Driving Record</span>
            </div>
          </div>
        </div>

        {/* ================= FILTER BAR ================= */}

        <div
          style={{
            background: isDark
              ? "rgba(18, 26, 41, 0.8)"
              : "#FFFFFF",
            border: `1px solid ${
              isDark
                ? "var(--border-strong)"
                : "var(--border-subtle)"
            }`,
            borderRadius: "14px",
            padding: "18px 24px",
            marginBottom: "36px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            boxShadow: isDark
              ? "none"
              : "0 4px 16px rgba(16,24,32,0.04)",
          }}
        >

          {/* ================= SEARCH ================= */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: isDark
                ? "var(--bg-secondary)"
                : "#F4F7FA",
              border: `1px solid ${
                isDark
                  ? "var(--border-strong)"
                  : "var(--border-subtle)"
              }`,
              borderRadius: "8px",
              padding: "10px 16px",
              width: "100%",
              maxWidth: "320px",
            }}
          >
            <Search
              size={16}
              style={{
                color: isDark
                  ? "var(--cyan-accent)"
                  : "var(--blue-teal)",
                marginRight: "10px",
              }}
            />

            <input
              type="text"
              placeholder="Search driver by name or city..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--primary-text)",
                fontSize: "13px",
                width: "100%",
                fontFamily: "var(--font-main)",
              }}
            />
          </div>

          {/* ================= CITY FILTER ================= */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--secondary-text)",
                textTransform: "uppercase",
                marginRight: "4px",
              }}
            >
              City:
            </span>

            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setFilterCity(city)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",

                  background:
                    filterCity === city
                      ? isDark
                        ? "rgba(112, 182, 208, 0.2)"
                        : "rgba(50, 96, 113, 0.15)"
                      : isDark
                      ? "rgba(12, 18, 31, 0.7)"
                      : "#F4F7FA",

                  border:
                    filterCity === city
                      ? `1px solid ${
                          isDark
                            ? "var(--cyan-accent)"
                            : "var(--blue-teal)"
                        }`
                      : `1px solid ${
                          isDark
                            ? "var(--border-strong)"
                            : "var(--border-subtle)"
                        }`,

                  color:
                    filterCity === city
                      ? isDark
                        ? "var(--cyan-accent)"
                        : "var(--blue-teal)"
                      : "var(--secondary-text)",

                  transition: "all 0.2s ease",
                }}
              >
                {city}
              </button>
            ))}
          </div>

          {/* ================= EXPERTISE FILTER ================= */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--secondary-text)",
                textTransform: "uppercase",
                marginRight: "4px",
              }}
            >
              Specialty:
            </span>

            {expertiseList.map((expertise) => (
              <button
                key={expertise}
                type="button"
                onClick={() =>
                  setFilterExpertise(expertise)
                }
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",

                  background:
                    filterExpertise === expertise
                      ? isDark
                        ? "rgba(112, 182, 208, 0.2)"
                        : "rgba(50, 96, 113, 0.15)"
                      : isDark
                      ? "rgba(12, 18, 31, 0.7)"
                      : "#F4F7FA",

                  border:
                    filterExpertise === expertise
                      ? `1px solid ${
                          isDark
                            ? "var(--cyan-accent)"
                            : "var(--blue-teal)"
                        }`
                      : `1px solid ${
                          isDark
                            ? "var(--border-strong)"
                            : "var(--border-subtle)"
                        }`,

                  color:
                    filterExpertise === expertise
                      ? isDark
                        ? "var(--cyan-accent)"
                        : "var(--blue-teal)"
                      : "var(--secondary-text)",

                  transition: "all 0.2s ease",
                }}
              >
                {expertise}
              </button>
            ))}
          </div>
        </div>

        {/* ================= DRIVER GRID ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
            />
          ))}
        </div>

        {/* ================= NO RESULTS ================= */}

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: isDark
                ? "rgba(18, 26, 41, 0.6)"
                : "#FFFFFF",
              border: `1px solid ${
                isDark
                  ? "var(--border-strong)"
                  : "var(--border-subtle)"
              }`,
              borderRadius: "14px",
            }}
          >
            <p
              style={{
                color: "var(--secondary-text)",
                fontSize: "16px",
              }}
            >
              No drivers match your current filter settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
