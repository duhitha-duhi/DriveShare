import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  MOCK_DRIVERS,
  MOCK_USER_VEHICLES,
} from "../data/mockDrivers";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Navigation,
  Phone,
  Send,
} from "lucide-react";

export default function RequestDriverFlow() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // GET SELECTED DRIVER
  // =========================================================

  const selectedDriver = location.state?.driver;
  const selectedDriverId = location.state?.driverId;

  const driver =
    selectedDriver ||
    MOCK_DRIVERS.find(
      (item) => item.id === selectedDriverId
    ) ||
    MOCK_DRIVERS[0];

  const defaultVehicle = MOCK_USER_VEHICLES?.[0];

  // =========================================================
  // REQUEST FLOW
  // waiting → accepted → live_trip
  // =========================================================

  const [step, setStep] = useState("waiting");

  const [reviewStatus, setReviewStatus] =
    useState("REQUEST SENT");

  // =========================================================
  // LIVE TRIP
  // =========================================================

  const [tripState, setTripState] =
    useState("DRIVER ON THE WAY");

  const [etaMinutes, setEtaMinutes] = useState(6);

  // =========================================================
  // DRIVER REQUEST SIMULATION
  // =========================================================

  useEffect(() => {
    if (step !== "waiting") {
      return;
    }

    const reviewTimer = setTimeout(() => {
      setReviewStatus("DRIVER REVIEWING REQUEST");
    }, 1400);

    const acceptedTimer = setTimeout(() => {
      setReviewStatus("DRIVER ACCEPTED");
      setStep("accepted");
    }, 3000);

    return () => {
      clearTimeout(reviewTimer);
      clearTimeout(acceptedTimer);
    };
  }, [step]);

  // =========================================================
  // CANCEL REQUEST
  // =========================================================

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Do you want to cancel this driver request?"
    );

    if (confirmCancel) {
      navigate("/find-driver", {
        replace: true,
      });
    }
  };

  // =========================================================
  // CONFIRM DRIVER
  // =========================================================

  const handleConfirmTrip = () => {
    const bookingId = `DS-2026-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const vehicleName = defaultVehicle
      ? `${defaultVehicle.makeModel} (${defaultVehicle.registration})`
      : "Customer's Own Vehicle";

    const newBooking = {
      id: bookingId,

      driver: driver.name,
      driverId: driver.id,
      driverAvatar: driver.avatar,

      driverPhone:
        "+91 98480 " +
        Math.floor(
          10000 + Math.random() * 90000
        ),

      driverRating: driver.rating,

      vehicle: vehicleName,

      pickup:
        "Morrispet Main Road, Tenali",

      destination:
        "Banjara Hills, Hyderabad",

      date: new Date()
        .toISOString()
        .split("T")[0],

      time: "08:30 AM",

      tripType:
        "City / Highway Duty",

      status: "Active",

      price: driver.price,

      serviceScope:
        "Chauffeur Driving Customer's Own Vehicle",

      createdAt:
        new Date().toISOString(),
    };

    // =====================================================
    // GET OLD BOOKINGS SAFELY
    // =====================================================

    let existingBookings = [];

    try {
      existingBookings = JSON.parse(
        localStorage.getItem(
          "driveShareBookings"
        ) || "[]"
      );

      if (!Array.isArray(existingBookings)) {
        existingBookings = [];
      }
    } catch {
      existingBookings = [];
    }

    // =====================================================
    // SAVE BOOKING
    // =====================================================

    localStorage.setItem(
      "driveShareBookings",
      JSON.stringify([
        newBooking,
        ...existingBookings,
      ])
    );

    localStorage.setItem(
      "driveShareLatestBooking",
      JSON.stringify(newBooking)
    );

    // =====================================================
    // OPEN LIVE TRIP
    // =====================================================

    setStep("live_trip");
  };

  // =========================================================
  // DRIVER ARRIVED
  // =========================================================

  const handleDriverArrived = () => {
    setTripState("DRIVER ARRIVED");
    setEtaMinutes(0);
  };

  // =========================================================
  // TRIP STARTED
  // =========================================================

  const handleTripStarted = () => {
    setTripState("TRIP STARTED");
  };

  // =========================================================
  // TRIP COMPLETED
  // =========================================================

  const handleTripCompleted = () => {
    setTripState("TRIP COMPLETED");
  };

  // =========================================================
  // BACK
  // =========================================================

  const handleBack = () => {
    navigate(-1);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        background: "var(--bg-base)",
        color: "var(--primary-text)",
        minHeight: "100vh",
        padding: "40px 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
        }}
      >

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <div
          style={{
            marginBottom: "24px",
          }}
        >
          <button
            type="button"
            onClick={handleBack}
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
            <span>BACK</span>
          </button>
        </div>

        {/* =====================================================
            STEP 1 — REQUEST SENT
        ===================================================== */}

        {step === "waiting" && (
          <div
            style={{
              background: "var(--card-bg)",
              border:
                "1px solid var(--border-color)",
              borderRadius: "24px",
              padding: "48px 36px",
              textAlign: "center",
              boxShadow:
                "var(--shadow-main)",
            }}
          >

            {/* ICON */}

            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background:
                  "var(--cyan-dim)",
                border:
                  "2px solid var(--cyan-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--cyan-accent)",
                margin: "0 auto 24px",
              }}
            >
              <Send size={32} />
            </div>

            <div
              className="tech-label"
              style={{
                marginBottom: "8px",
              }}
            >
              DISPATCH REQUEST //
            </div>

            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--primary-text)",
                margin:
                  "0 0 8px",
              }}
            >
              REQUEST SENT
            </h1>

            <p
              style={{
                color:
                  "var(--secondary-text)",
                fontSize: "15px",
                margin:
                  "0 0 24px",
              }}
            >
              Waiting for the driver to
              accept your dispatch request...
            </p>

            {/* STATUS */}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 20px",
                borderRadius: "20px",
                background:
                  "var(--bg-main)",
                border:
                  "1px solid var(--cyan-accent)",
                fontFamily:
                  "var(--font-mono)",
                fontSize: "12px",
                color:
                  "var(--cyan-accent)",
                marginBottom: "36px",
              }}
            >
              <span className="status-dot" />

              <span>
                {reviewStatus}
              </span>
            </div>

            {/* DRIVER */}

            <div
              style={{
                background:
                  "var(--bg-main)",
                border:
                  "1px solid var(--border-color)",
                borderRadius: "14px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: "20px",
                marginBottom: "32px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      margin:
                        "0 0 5px",
                    }}
                  >
                    {driver.name}
                  </h3>

                  <div
                    style={{
                      fontSize: "12px",
                      color:
                        "var(--secondary-text)",
                    }}
                  >
                    ★ {driver.rating} ·{" "}
                    {driver.experience}
                  </div>
                </div>
              </div>

              <div
                style={{
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color:
                      "var(--secondary-text)",
                    fontFamily:
                      "var(--font-mono)",
                  }}
                >
                  SERVICE FEE
                </div>

                <strong
                  style={{
                    color:
                      "var(--cyan-accent)",
                    fontSize: "18px",
                  }}
                >
                  {driver.price}
                </strong>
              </div>
            </div>

            {/* CANCEL */}

            <button
              type="button"
              onClick={handleCancel}
              className="ds-btn-secondary"
              style={{
                padding: "12px 24px",
                fontSize: "12px",
              }}
            >
              CANCEL REQUEST
            </button>
          </div>
        )}

        {/* =====================================================
            STEP 2 — DRIVER ACCEPTED
        ===================================================== */}

        {step === "accepted" && (
          <div
            style={{
              background:
                "var(--card-bg)",
              border:
                "1px solid var(--border-color)",
              borderRadius: "24px",
              padding: "42px 32px",
              boxShadow:
                "var(--shadow-main)",
            }}
          >

            {/* SUCCESS */}

            <div
              style={{
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "76px",
                  height: "76px",
                  borderRadius: "50%",
                  background:
                    "rgba(74, 222, 128, 0.15)",
                  border:
                    "2px solid #4ade80",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin:
                    "0 auto 20px",
                  color: "#4ade80",
                }}
              >
                <CheckCircle2
                  size={38}
                />
              </div>

              <div
                className="tech-label"
                style={{
                  marginBottom: "8px",
                }}
              >
                DRIVER RESPONSE //
              </div>

              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  margin:
                    "0 0 8px",
                }}
              >
                DRIVER ACCEPTED
              </h1>

              <p
                style={{
                  color:
                    "var(--secondary-text)",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                {driver.name} has accepted
                your driver request.
              </p>
            </div>

            {/* DRIVER CARD */}

            <div
              style={{
                background:
                  "var(--bg-main)",
                border:
                  "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "22px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "14px",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <h2
                    style={{
                      margin:
                        "0 0 6px",
                      fontSize: "19px",
                    }}
                  >
                    {driver.name}
                  </h2>

                  <div
                    style={{
                      color:
                        "var(--secondary-text)",
                      fontSize: "13px",
                    }}
                  >
                    ★ {driver.rating} ·{" "}
                    {driver.reviewCount} reviews
                  </div>

                  <div
                    style={{
                      color:
                        "var(--cyan-accent)",
                      fontSize: "12px",
                      marginTop: "5px",
                    }}
                  >
                    {driver.availability}
                  </div>
                </div>
              </div>

              {/* VEHICLE */}

              <div
                style={{
                  borderTop:
                    "1px solid var(--border-color)",
                  paddingTop: "18px",
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "14px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color:
                        "var(--secondary-text)",
                      fontFamily:
                        "var(--font-mono)",
                    }}
                  >
                    YOUR VEHICLE
                  </div>

                  <strong
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {defaultVehicle
                      ? defaultVehicle.makeModel
                      : "Your Own Vehicle"}
                  </strong>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color:
                        "var(--secondary-text)",
                      fontFamily:
                        "var(--font-mono)",
                    }}
                  >
                    SERVICE FEE
                  </div>

                  <strong
                    style={{
                      color:
                        "var(--cyan-accent)",
                      fontSize: "15px",
                    }}
                  >
                    {driver.price}
                  </strong>
                </div>
              </div>
            </div>

            {/* OPERATIONAL PRINCIPLE */}

            <div
              style={{
                background:
                  "var(--cyan-dim)",
                border:
                  "1px solid var(--cyan-accent)",
                borderRadius: "12px",
                padding: "16px 18px",
                marginBottom: "28px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <Navigation
                size={20}
                style={{
                  color:
                    "var(--cyan-accent)",
                  flexShrink: 0,
                }}
              />

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    marginBottom: "4px",
                  }}
                >
                  DRIVER WILL DRIVE YOUR OWN VEHICLE
                </strong>

                <span
                  style={{
                    color:
                      "var(--secondary-text)",
                    fontSize: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  You provide the car. The
                  selected driver provides the
                  chauffeur service.
                </span>
              </div>
            </div>

            {/* ACTIONS */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="ds-btn-secondary"
                onClick={handleCancel}
                style={{
                  padding: "13px 22px",
                  fontSize: "12px",
                }}
              >
                CANCEL
              </button>

              <button
                type="button"
                className="ds-btn-primary"
                onClick={handleConfirmTrip}
                style={{
                  padding: "13px 24px",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>
                  CONFIRM DRIVER & START TRIP
                </span>

                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================
            STEP 3 — LIVE TRIP
        ===================================================== */}

        {step === "live_trip" && (
          <div
            style={{
              background:
                "var(--card-bg)",
              border:
                "1px solid var(--border-color)",
              borderRadius: "24px",
              padding: "32px",
              boxShadow:
                "var(--shadow-main)",
            }}
          >

            {/* HEADER */}

            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <div
                className="tech-label"
                style={{
                  marginBottom: "8px",
                }}
              >
                LIVE TRIP //
              </div>

              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  margin:
                    "0 0 8px",
                }}
              >
                {tripState}
              </h1>

              <p
                style={{
                  color:
                    "var(--secondary-text)",
                  margin: 0,
                  fontSize: "14px",
                }}
              >
                Your driver is handling
                your own vehicle.
              </p>
            </div>

            {/* ROUTE TRACKING */}

            <div
              style={{
                background:
                  "var(--bg-main)",
                border:
                  "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "22px",
                marginBottom: "24px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                  fontSize: "11px",
                  fontFamily:
                    "var(--font-mono)",
                  color:
                    "var(--secondary-text)",
                }}
              >
                <span>
                  ROUTE TRACKING
                </span>

                <span>
                  ETA:{" "}
                  {tripState ===
                  "TRIP COMPLETED"
                    ? "Arrived"
                    : `${etaMinutes} MIN`}
                </span>
              </div>

              {/* PROGRESS */}

              <div
                style={{
                  height: "5px",
                  background:
                    "var(--border-color)",
                  borderRadius: "4px",
                  marginBottom: "22px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width:
                      tripState ===
                      "DRIVER ON THE WAY"
                        ? "35%"
                        : tripState ===
                          "DRIVER ARRIVED"
                        ? "60%"
                        : tripState ===
                          "TRIP STARTED"
                        ? "80%"
                        : "100%",
                    background:
                      "var(--cyan-accent)",
                    borderRadius: "4px",
                    transition:
                      "width 0.4s ease",
                  }}
                />
              </div>

              {/* ROUTE */}

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: "20px",
                  fontSize: "13px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "7px",
                  }}
                >
                  <MapPin
                    size={16}
                    style={{
                      color:
                        "var(--cyan-accent)",
                    }}
                  />

                  <strong>
                    Tenali
                  </strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "7px",
                  }}
                >
                  <Navigation
                    size={16}
                    style={{
                      color:
                        "var(--cyan-accent)",
                    }}
                  />

                  <strong>
                    Hyderabad
                  </strong>
                </div>

              </div>
            </div>

            {/* DRIVER CONTACT */}

            <div
              style={{
                background:
                  "var(--bg-main)",
                border:
                  "1px solid var(--border-color)",
                borderRadius: "14px",
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: "20px",
                marginBottom: "24px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "11px",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "15px",
                      marginBottom: "4px",
                    }}
                  >
                    {driver.name}
                  </strong>

                  <span
                    style={{
                      fontSize: "12px",
                      color:
                        "var(--secondary-text)",
                      fontFamily:
                        "var(--font-mono)",
                    }}
                  >
                    Chauffeur Service
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="ds-btn-secondary"
                onClick={() =>
                  alert(
                    `Calling ${driver.name}...`
                  )
                }
                style={{
                  padding: "9px 14px",
                  fontSize: "11px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Phone size={14} />
                <span>CALL</span>
              </button>
            </div>

            {/* TRIP STATUS CONTROLS */}

            <div
              style={{
                background:
                  "var(--bg-main)",
                border:
                  "1px dashed var(--border-color)",
                borderRadius: "12px",
                padding: "16px 18px",
                marginBottom: "24px",
              }}
            >

              <div
                style={{
                  fontSize: "11px",
                  fontFamily:
                    "var(--font-mono)",
                  color:
                    "var(--secondary-text)",
                  marginBottom: "12px",
                }}
              >
                TRIP STATUS CONTROLS //
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >

                <button
                  type="button"
                  onClick={
                    handleDriverArrived
                  }
                  style={{
                    padding:
                      "7px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontFamily:
                      "var(--font-mono)",
                    background:
                      tripState ===
                      "DRIVER ARRIVED"
                        ? "var(--cyan-dim)"
                        : "var(--bg-base)",
                    border:
                      "1px solid var(--border-color)",
                    color:
                      "var(--primary-text)",
                    cursor: "pointer",
                  }}
                >
                  1. Driver Arrived
                </button>

                <button
                  type="button"
                  onClick={
                    handleTripStarted
                  }
                  style={{
                    padding:
                      "7px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontFamily:
                      "var(--font-mono)",
                    background:
                      tripState ===
                      "TRIP STARTED"
                        ? "var(--cyan-dim)"
                        : "var(--bg-base)",
                    border:
                      "1px solid var(--border-color)",
                    color:
                      "var(--primary-text)",
                    cursor: "pointer",
                  }}
                >
                  2. Trip Started
                </button>

                <button
                  type="button"
                  onClick={
                    handleTripCompleted
                  }
                  style={{
                    padding:
                      "7px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontFamily:
                      "var(--font-mono)",
                    background:
                      tripState ===
                      "TRIP COMPLETED"
                        ? "var(--cyan-dim)"
                        : "var(--bg-base)",
                    border:
                      "1px solid var(--border-color)",
                    color:
                      "var(--primary-text)",
                    cursor: "pointer",
                  }}
                >
                  3. Trip Completed
                </button>

              </div>
            </div>

            {/* VIEW BOOKINGS */}

            <div
              style={{
                textAlign: "center",
              }}
            >
              <button
                type="button"
                className="ds-btn-primary"
                onClick={() =>
                  navigate("/bookings")
                }
                style={{
                  padding: "14px 28px",
                  fontSize: "13px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>
                  VIEW MY TRIPS
                </span>

                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}