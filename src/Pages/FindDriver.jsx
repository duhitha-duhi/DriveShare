import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DriverCard from "../Components/DriverCard";
import { MOCK_DRIVERS, MOCK_USER_VEHICLES } from "../data/mockDrivers";
import { useTheme } from "../context/ThemeContext";
import {
  MapPin,
  Navigation,
  Calendar,
  Clock,
  Car,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Send,
  Radio,
  Radar,
  Activity,
} from "lucide-react";

export default function FindDriver() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Search form fields
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("09:00");
  const [tripType, setTripType] = useState("One Way");
  const [selectedVehicle, setSelectedVehicle] = useState(MOCK_USER_VEHICLES[0].makeModel);

  // Geolocation states
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoStatus, setGeoStatus] = useState({
    allowed: null,
    message: "",
  });

  // Searching / Matching Screen states
  const [isSearching, setIsSearching] = useState(false);
  const [searchPhase, setSearchPhase] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus({
        allowed: false,
        message: "Geolocation is not supported by your browser. Please enter location manually.",
      });
      return;
    }

    setGeoLoading(true);
    setGeoStatus({ allowed: null, message: "Requesting browser location permission..." });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          if (res.ok) {
            const data = await res.json();
            const place =
              data.address?.suburb ||
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.state_district ||
              "Current Location";
            const state = data.address?.state || "";
            setCurrentLocation(`${place}${state ? `, ${state}` : ""}`);
            setGeoStatus({
              allowed: true,
              message: `Live GPS detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            });
          } else {
            setCurrentLocation(`GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
            setGeoStatus({ allowed: true, message: "Location coordinates acquired." });
          }
        } catch (e) {
          setCurrentLocation(`GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          setGeoStatus({ allowed: true, message: "Location acquired via coordinates." });
        } finally {
          setGeoLoading(false);
        }
      },
      (error) => {
        setGeoLoading(false);
        let msg = "Location permission denied. Please enter your location manually below.";
        if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "GPS signal unavailable. Please enter your location manually.";
        } else if (error.code === error.TIMEOUT) {
          msg = "Location request timed out. Please enter manually.";
        }
        setGeoStatus({
          allowed: false,
          message: msg,
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchPhase(1);

    // Simulated Radar Matching Progression
    const timer1 = setTimeout(() => setSearchPhase(2), 900);
    const timer2 = setTimeout(() => setSearchPhase(3), 1800);
    const timer3 = setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const filteredDrivers = MOCK_DRIVERS.filter((driver) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      driver.name.toLowerCase().includes(query) ||
      driver.location.toLowerCase().includes(query) ||
      driver.serviceAreas.some((area) => area.toLowerCase().includes(query))
    );
  });

  return (
    <div style={{ background: "var(--bg-base)", color: "var(--primary-text)", minHeight: "100vh", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <div className="tech-label" style={{ marginBottom: "8px" }}>
            DISPATCH DISCOVERY //
          </div>
          <h1
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "38px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--primary-text)",
              marginBottom: "8px",
            }}
          >
            Request a Verified Driver for Your Own Car
          </h1>
          <p style={{ color: "var(--secondary-text)", fontSize: "16px", maxWidth: "680px" }}>
            Enter your journey details and client vehicle. We will scan and match you with background-verified
            chauffeurs available in your area.
          </p>
        </div>

        {/* Searching / Matching Screen (Section 20 Simulation) */}
        {isSearching ? (
          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--cyan-accent)",
              borderRadius: "24px",
              padding: "60px 32px",
              textAlign: "center",
              marginBottom: "48px",
              boxShadow: "var(--shadow-main)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animated Radar Pulse Rings */}
            <div
              style={{
                position: "relative",
                width: "160px",
                height: "160px",
                margin: "0 auto 30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "2px solid var(--cyan-accent)",
                  animation: "pulseRadar 2s infinite ease-out",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "20px",
                  borderRadius: "50%",
                  border: "2px solid var(--cyan-accent)",
                  animation: "pulseRadar 2s infinite ease-out 0.6s",
                }}
              />
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "var(--cyan-dim)",
                  border: "2px solid var(--cyan-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cyan-accent)",
                  boxShadow: "0 0 30px rgba(112, 182, 208, 0.4)",
                  zIndex: 2,
                }}
              >
                <Radio size={36} />
              </div>
            </div>

            <div className="tech-label" style={{ marginBottom: "8px" }}>
              DISPATCH RADAR ACTIVE //
            </div>

            <h2
              style={{
                fontFamily: "var(--font-main)",
                fontSize: "30px",
                fontWeight: 800,
                color: "var(--primary-text)",
                marginBottom: "10px",
              }}
            >
              FINDING DRIVERS NEAR YOU
            </h2>

            <p style={{ color: "var(--secondary-text)", fontSize: "15px", maxWidth: "520px", margin: "0 auto 28px" }}>
              Searching for verified drivers available for your journey from{" "}
              <strong style={{ color: "var(--primary-text)" }}>{currentLocation || "Tenali"}</strong> to{" "}
              <strong style={{ color: "var(--primary-text)" }}>{destination || "Hyderabad"}</strong>...
            </p>

            {/* Telemetry Status Line */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                borderRadius: "20px",
                background: "var(--bg-main)",
                border: "1px solid var(--border-color)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--cyan-accent)",
              }}
            >
              <span className="status-dot" />
              <span>
                {searchPhase === 1 && "Pinging verified chauffeurs in 5.0 km radius..."}
                {searchPhase === 2 && "Filtering transmission experience for your vehicle..."}
                {searchPhase === 3 && "3 matching drivers located with active availability!"}
              </span>
            </div>

            <div style={{ marginTop: "24px" }}>
              <button
                type="button"
                onClick={() => {
                  setIsSearching(false);
                  setHasSearched(true);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--secondary-text)",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Skip search animation
              </button>
            </div>
          </div>
        ) : (
          /* Request Specification Form */
          <div
            style={{
              background: "var(--card-bg)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--border-color)",
              borderRadius: "20px",
              padding: "36px 32px",
              marginBottom: "48px",
              boxShadow: "var(--shadow-main)",
            }}
          >
            <form onSubmit={handleRequestSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "24px",
                  marginBottom: "24px",
                }}
              >
                {/* Pickup / Current Location */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--secondary-text)",
                      marginBottom: "8px",
                    }}
                  >
                    Current Location / Pickup *
                  </label>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      background: "var(--input-bg)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <MapPin size={18} style={{ color: "var(--cyan-accent)", marginLeft: "14px", flexShrink: 0 }} />
                    <input
                      type="text"
                      required
                      placeholder="Enter pickup address or city"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        padding: "14px 12px",
                        color: "var(--primary-text)",
                        fontSize: "14px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={geoLoading}
                      title="Use live browser GPS"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "var(--cyan-dim)",
                        border: "none",
                        borderLeft: "1px solid var(--border-color)",
                        padding: "12px 14px",
                        color: "var(--cyan-accent)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Navigation size={13} />
                      <span>{geoLoading ? "Detecting..." : "GPS"}</span>
                    </button>
                  </div>

                  {geoStatus.message && (
                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        color: geoStatus.allowed === false ? "#f87171" : "var(--cyan-accent)",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {geoStatus.allowed === false ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                      <span>{geoStatus.message}</span>
                    </div>
                  )}
                </div>

                {/* Destination */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--secondary-text)",
                      marginBottom: "8px",
                    }}
                  >
                    Destination Address *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "var(--input-bg)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <Navigation size={18} style={{ color: "var(--cyan-accent)", marginLeft: "14px", flexShrink: 0 }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad, Guntur, Vijayawada Airport"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        padding: "14px 12px",
                        color: "var(--primary-text)",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--secondary-text)",
                      marginBottom: "8px",
                    }}
                  >
                    Journey Date
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "var(--input-bg)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <Calendar size={18} style={{ color: "var(--cyan-accent)", marginLeft: "14px", flexShrink: 0 }} />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        padding: "14px 12px",
                        color: "var(--primary-text)",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--secondary-text)",
                      marginBottom: "8px",
                    }}
                  >
                    Departure Time
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "var(--input-bg)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <Clock size={18} style={{ color: "var(--cyan-accent)", marginLeft: "14px", flexShrink: 0 }} />
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        padding: "14px 12px",
                        color: "var(--primary-text)",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Own Vehicle and Trip Type Selection */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border-color)",
                }}
              >
                {/* Vehicle Selection (Customer's own vehicle) */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Car size={18} style={{ color: "var(--cyan-accent)" }} />
                  <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--secondary-text)", textTransform: "uppercase" }}>
                    Your Vehicle:
                  </span>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      color: "var(--primary-text)",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    {MOCK_USER_VEHICLES.map((v) => (
                      <option key={v.id} value={v.makeModel}>
                        {v.makeModel} ({v.registration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Trip Type */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {["One Way", "Round Trip"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        cursor: "pointer",
                        background: tripType === type ? "var(--cyan-dim)" : "var(--bg-surface)",
                        border: tripType === type ? "1px solid var(--cyan-accent)" : "1px solid var(--border-color)",
                        color: tripType === type ? "var(--cyan-accent)" : "var(--secondary-text)",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Primary REQUEST A DRIVER Button */}
                <button
                  type="submit"
                  className="ds-btn-primary"
                  style={{ padding: "14px 28px", fontSize: "14px" }}
                >
                  <span>REQUEST A DRIVER</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Section 21: Available Drivers Near You */}
        <div
          id="available-drivers-results"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div>
            <div className="tech-label" style={{ marginBottom: "4px" }}>
              DISPATCH LISTING //
            </div>
            <h2
              style={{
                fontFamily: "var(--font-main)",
                fontSize: "26px",
                fontWeight: 800,
                color: "var(--primary-text)",
                margin: 0,
              }}
            >
              DRIVERS NEAR YOU ({filteredDrivers.length})
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--input-bg)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              padding: "8px 14px",
              width: "240px",
            }}
          >
            <Search size={14} style={{ color: "var(--cyan-accent)", marginRight: "8px" }} />
            <input
              type="text"
              placeholder="Filter by name / area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--primary-text)",
                fontSize: "12px",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Driver Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      </div>
    </div>
  );
}
