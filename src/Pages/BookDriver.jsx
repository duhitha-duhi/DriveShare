import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MOCK_DRIVERS, MOCK_USER_VEHICLES } from "../data/mockDrivers";
import { useTheme } from "../context/ThemeContext";
import {
  Car,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Send,
} from "lucide-react";

export default function BookDriver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const [selectedDriverId, setSelectedDriverId] = useState(
    id || MOCK_DRIVERS[0].id
  );

  const selectedDriver =
    MOCK_DRIVERS.find((d) => d.id === selectedDriverId) || MOCK_DRIVERS[0];

  const [selectedVehicleId, setSelectedVehicleId] = useState(
    MOCK_USER_VEHICLES[0].id
  );
  const [customVehicle, setCustomVehicle] = useState({
    makeModel: "",
    registration: "",
    transmission: "Automatic",
  });
  const [useCustomVehicle, setUseCustomVehicle] = useState(false);

  const currentVehicle = useCustomVehicle
    ? {
        makeModel: customVehicle.makeModel || "Customer Custom Vehicle",
        registration: customVehicle.registration || "AP 07 XX 0000",
        transmission: customVehicle.transmission,
        fuelType: "Personal",
      }
    : MOCK_USER_VEHICLES.find((v) => v.id === selectedVehicleId) ||
      MOCK_USER_VEHICLES[0];

  const [pickup, setPickup] = useState(
    location.state?.pickup || "Morrispet Main Road, Tenali"
  );
  const [destination, setDestination] = useState(
    location.state?.destination || "Banjara Hills, Hyderabad"
  );
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("08:30");
  const [tripType, setTripType] = useState("Outstation (One Way)");
  const [ownerDeclaration, setOwnerDeclaration] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const calculateFee = () => {
    let base = selectedDriver.priceAmount || 500;
    if (tripType === "Round Trip") base = Math.round(base * 1.8);
    if (tripType.includes("Outstation")) base = (selectedDriver.pricePerDayAmount || 950) + 400;
    const platformFee = 60;
    const taxes = Math.round(base * 0.05);
    const total = base + platformFee + taxes;
    return { base, platformFee, taxes, total };
  };

  const fee = calculateFee();

  const handleConfirmTrip = (e) => {
    e.preventDefault();

    if (!pickup.trim()) {
      setError("Please specify the pickup location where the driver should arrive.");
      return;
    }
    if (!destination.trim()) {
      setError("Please specify your journey destination.");
      return;
    }
    if (!ownerDeclaration) {
      setError("Please confirm that this is your own vehicle with valid insurance.");
      return;
    }

    setSubmitting(true);
    setError("");

    const bookingId = `DS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      id: bookingId,
      driver: selectedDriver.name,
      driverId: selectedDriver.id,
      driverAvatar: selectedDriver.avatar,
      driverPhone: "+91 98480 " + Math.floor(10000 + Math.random() * 90000),
      driverRating: selectedDriver.rating,
      vehicle: `${currentVehicle.makeModel} (${currentVehicle.registration})`,
      vehicleSpecs: `${currentVehicle.transmission} • ${currentVehicle.fuelType || "Personal"}`,
      pickup: pickup,
      destination: destination,
      date: date,
      time: time,
      tripType: tripType,
      status: "Upcoming",
      price: `₹${fee.total.toLocaleString("en-IN")}`,
      serviceScope: "Chauffeur Driving Customer's Own Vehicle",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("driveShareBookings")) || [];
    localStorage.setItem(
      "driveShareBookings",
      JSON.stringify([newBooking, ...existing])
    );
    localStorage.setItem("driveShareLatestBooking", JSON.stringify(newBooking));

    setTimeout(() => {
      setSubmitting(false);
      navigate("/booking-confirmation", { state: { booking: newBooking } });
    }, 600);
  };

  return (
    <div style={{ background: "var(--bg-base)", color: "var(--primary-text)", minHeight: "100vh", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              color: "var(--secondary-text)",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK TO PREVIOUS PAGE</span>
          </button>
        </div>

        <div style={{ marginBottom: "36px" }}>
          <div className="tech-label" style={{ marginBottom: "8px" }}>
            CHASSIS REQUEST SPECIFICATION //
          </div>
          <h1
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "36px",
              fontWeight: 800,
              color: "var(--primary-text)",
              marginBottom: "8px",
            }}
          >
            Confirm Driver Dispatch for Your Own Vehicle
          </h1>
          <p style={{ color: "var(--secondary-text)", fontSize: "15px", maxWidth: "720px" }}>
            The selected driver will arrive at your designated pickup address to take the wheel of your
            personal vehicle. You provide the car; our verified chauffeur handles the journey.
          </p>
        </div>

        {/* Concept Reminder Banner */}
        <div
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(50, 96, 113, 0.25) 0%, rgba(18, 26, 41, 0.9) 100%)"
              : "linear-gradient(135deg, rgba(50, 96, 113, 0.15) 0%, #FFFFFF 100%)",
            border: "1px solid var(--cyan-accent)",
            borderRadius: "14px",
            padding: "16px 24px",
            marginBottom: "36px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "var(--cyan-dim)",
              border: "1px solid var(--cyan-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--cyan-accent)",
              flexShrink: 0,
            }}
          >
            <KeyRound size={20} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--cyan-accent)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              IMPORTANT OPERATIONAL PRINCIPLE
            </div>
            <div style={{ color: "var(--primary-text)", fontSize: "14px", fontWeight: 600 }}>
              This is NOT a taxi service. The driver will drive YOUR car.
            </div>
            <div style={{ color: "var(--secondary-text)", fontSize: "12px" }}>
              Please have your vehicle keys, registration copy, and valid insurance policy ready before arrival.
            </div>
          </div>
        </div>

        <form onSubmit={handleConfirmTrip}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 0.7fr",
              gap: "36px",
            }}
            className="booking-page-grid"
          >
            {/* Left Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {/* SECTION 1: YOUR VEHICLE */}
              <div
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div className="tech-label">SECTION 01 // YOUR VEHICLE</div>
                  <span style={{ color: "var(--secondary-text)", fontSize: "12px", fontFamily: "var(--font-mono)" }}>
                    CAR TO BE DRIVEN
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                  {MOCK_USER_VEHICLES.map((v) => {
                    const isSelected = !useCustomVehicle && selectedVehicleId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => {
                          setSelectedVehicleId(v.id);
                          setUseCustomVehicle(false);
                        }}
                        style={{
                          background: isSelected ? "var(--cyan-dim)" : "var(--bg-main)",
                          border: isSelected ? "1px solid var(--cyan-accent)" : "1px solid var(--border-color)",
                          borderRadius: "10px",
                          padding: "16px 20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "8px",
                              background: isSelected ? "var(--blue-teal)" : "var(--bg-surface)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: isSelected ? "#FFFFFF" : "var(--secondary-text)",
                            }}
                          >
                            <Car size={18} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--primary-text)" }}>
                              {v.makeModel}
                            </div>
                            <div
                              style={{
                                color: "var(--secondary-text)",
                                fontSize: "12px",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              Reg: <strong style={{ color: "var(--cyan-accent)" }}>{v.registration}</strong> • {v.transmission} • {v.fuelType}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            border: isSelected ? "5px solid var(--cyan-accent)" : "2px solid var(--border-color)",
                            background: isSelected ? "var(--bg-main)" : "transparent",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: YOUR JOURNEY */}
              <div
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div className="tech-label">SECTION 02 // YOUR JOURNEY</div>
                  <span style={{ color: "var(--secondary-text)", fontSize: "12px", fontFamily: "var(--font-mono)" }}>
                    SCHEDULE & ROUTE
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--secondary-text)", marginBottom: "6px", textTransform: "uppercase" }}>
                      Pickup Location *
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: "var(--input-bg)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "10px 14px",
                      }}
                    >
                      <MapPin size={16} style={{ color: "var(--cyan-accent)", marginRight: "10px" }} />
                      <input
                        type="text"
                        required
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        style={{ background: "transparent", border: "none", outline: "none", color: "var(--primary-text)", width: "100%", fontSize: "13px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--secondary-text)", marginBottom: "6px", textTransform: "uppercase" }}>
                      Destination Address *
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: "var(--input-bg)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "10px 14px",
                      }}
                    >
                      <Navigation size={16} style={{ color: "var(--cyan-accent)", marginRight: "10px" }} />
                      <input
                        type="text"
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        style={{ background: "transparent", border: "none", outline: "none", color: "var(--primary-text)", width: "100%", fontSize: "13px" }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--secondary-text)", marginBottom: "6px", textTransform: "uppercase" }}>
                      Date
                    </label>
                    <div style={{ display: "flex", alignItems: "center", background: "var(--input-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "10px 12px" }}>
                      <Calendar size={15} style={{ color: "var(--cyan-accent)", marginRight: "8px" }} />
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ background: "transparent", border: "none", outline: "none", color: "var(--primary-text)", fontSize: "12px", width: "100%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--secondary-text)", marginBottom: "6px", textTransform: "uppercase" }}>
                      Time
                    </label>
                    <div style={{ display: "flex", alignItems: "center", background: "var(--input-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", padding: "10px 12px" }}>
                      <Clock size={15} style={{ color: "var(--cyan-accent)", marginRight: "8px" }} />
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={{ background: "transparent", border: "none", outline: "none", color: "var(--primary-text)", fontSize: "12px", width: "100%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--secondary-text)", marginBottom: "6px", textTransform: "uppercase" }}>
                      Trip Type
                    </label>
                    <select
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                      style={{
                        width: "100%",
                        background: "var(--input-bg)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "10px 12px",
                        color: "var(--primary-text)",
                        fontSize: "12px",
                        outline: "none",
                      }}
                    >
                      <option value="One Way">City (One Way)</option>
                      <option value="Round Trip">City (Round Trip)</option>
                      <option value="Outstation (One Way)">Outstation (One Way)</option>
                      <option value="Full Day Highway Duty">Full Day Duty (8-12 hrs)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: YOUR DRIVER */}
              <div
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div className="tech-label" style={{ marginBottom: "16px" }}>
                  SECTION 03 // ASSIGNED CHAUFFEUR
                </div>

                <div
                  style={{
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <img
                      src={selectedDriver.avatar}
                      alt={selectedDriver.name}
                      style={{ width: "56px", height: "56px", borderRadius: "12px", objectFit: "cover" }}
                    />
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "var(--primary-text)" }}>
                        {selectedDriver.name}
                      </h3>
                      <div style={{ fontSize: "12px", color: "var(--secondary-text)", marginTop: "4px" }}>
                        ★ {selectedDriver.rating} • {selectedDriver.experience} • {selectedDriver.trips}
                      </div>
                    </div>
                  </div>

                  <select
                    value={selectedDriverId}
                    onChange={(e) => setSelectedDriverId(e.target.value)}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      color: "var(--cyan-accent)",
                      fontSize: "12px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {MOCK_DRIVERS.map((d) => (
                      <option key={d.id} value={d.id}>
                        Switch to {d.name} ({d.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Confirmation */}
            <div>
              <div
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "var(--shadow-main)",
                  position: "sticky",
                  top: "90px",
                }}
              >
                <div className="tech-label" style={{ marginBottom: "16px" }}>
                  SECTION 04 // DRIVER SERVICE FEE
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginBottom: "20px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid var(--border-color)",
                    fontSize: "13px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--secondary-text)" }}>
                    <span>Chauffeur Service ({tripType})</span>
                    <strong style={{ color: "var(--primary-text)", fontFamily: "var(--font-mono)" }}>
                      ₹{fee.base.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--secondary-text)" }}>
                    <span>Platform Verification Assistance</span>
                    <strong style={{ color: "var(--primary-text)", fontFamily: "var(--font-mono)" }}>
                      ₹{fee.platformFee}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--secondary-text)" }}>
                    <span>Applicable GST (5%)</span>
                    <strong style={{ color: "var(--primary-text)", fontFamily: "var(--font-mono)" }}>
                      ₹{fee.taxes}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "12px", color: "var(--secondary-text)", textTransform: "uppercase" }}>
                      TOTAL SERVICE CHARGE
                    </span>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "28px",
                        fontWeight: 800,
                        color: "var(--cyan-accent)",
                      }}
                    >
                      ₹{fee.total.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      background: "var(--cyan-dim)",
                      border: "1px solid var(--cyan-accent)",
                      color: "var(--cyan-accent)",
                    }}
                  >
                    POST-JOURNEY PAYMENT
                  </span>
                </div>

                <div
                  style={{
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px",
                    padding: "14px",
                    marginBottom: "20px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "12px",
                      color: "var(--secondary-text)",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={ownerDeclaration}
                      onChange={(e) => setOwnerDeclaration(e.target.checked)}
                      style={{ marginTop: "3px", accentColor: "var(--cyan-accent)" }}
                    />
                    <span>
                      I declare that I am the legal owner / authorized custodian of the vehicle and will
                      provide valid registration and PUC documents to the chauffeur.
                    </span>
                  </label>
                </div>

                {error && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "#f87171",
                      fontSize: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <AlertCircle size={15} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="ds-btn-primary"
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "14px",
                  }}
                >
                  {submitting ? (
                    <span>CONFIRMING DISPATCH...</span>
                  ) : (
                    <>
                      <span>CONFIRM DRIVER & TRIP</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}