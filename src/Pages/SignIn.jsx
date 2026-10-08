import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DriveShareLogo from "../Components/DriveShareLogo";
import ThemeToggle from "../Components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight, Lock } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Phone number will NOT be automatically filled
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  // ================= CAR ROTATION VIEWS =================

  const carImages = [
    "/images/Car/Car-front-right.png",
    "/images/Car/Car-front.png",
    "/images/Car/Car-right.png",
    "/images/Car/Car-rear-right.png",
  ];

  const [carIndex, setCarIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);

  // ================= PRELOAD IMAGES =================

  useEffect(() => {
    carImages.forEach((src) => {
      const img = new Image();
      img.src = src;

      if (img.decode) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  // ================= AUTO ROTATION =================

  useEffect(() => {
    if (isDragging) return;

    const timer = setInterval(() => {
      setCarIndex((prev) => (prev + 1) % carImages.length);
    }, 1800);

    return () => clearInterval(timer);
  }, [isDragging]);

  // ================= POINTER DRAG =================

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const distance = e.clientX - dragStartX.current;
    const threshold = 40;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        setCarIndex(
          (prev) => (prev - 1 + carImages.length) % carImages.length
        );
      } else {
        setCarIndex((prev) => (prev + 1) % carImages.length);
      }

      dragStartX.current = e.clientX;
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);

    try {
      if (
        e &&
        e.currentTarget &&
        e.currentTarget.hasPointerCapture(e.pointerId)
      ) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
  };

  // ================= TOUCH =================

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      setIsDragging(true);
      dragStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches || e.touches.length === 0) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const distance = currentX - dragStartX.current;
    const threshold = 40;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        setCarIndex(
          (prev) => (prev - 1 + carImages.length) % carImages.length
        );
      } else {
        setCarIndex((prev) => (prev + 1) % carImages.length);
      }

      dragStartX.current = currentX;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // ================= PHONE INPUT =================

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setPhone(value);
      setError("");
    }
  };

  // ================= PHONE VALIDATION =================

  const isValidPhone = (value) => {
    return /^\d{10}$/.test(value);
  };

  // ================= CONTINUE =================

  const handleContinue = (e) => {
    e.preventDefault();

    if (sending) return;

    if (!phone || !isValidPhone(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSending(true);
    setError("");

    // Save the number entered by the user
    localStorage.setItem("driveSharePhone", phone);

    // Go to OTP verification page
    setTimeout(() => {
      setSending(false);

      navigate("/otp-verification");
    }, 500);
  };

  // ================= UI =================

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: isDark ? "#080D16" : "#F5F7FA",
        color: "var(--primary-text)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}

      <header
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "22px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <DriveShareLogo size="lg" showTagline={true} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <ThemeToggle />
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "20px 32px 40px",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.9fr",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* ================= LEFT - CAR ================= */}

        <div
          className="ds-signin-car-col"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="ds-signin-car-stage"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            style={{
              width: "100%",
              maxWidth: "760px",
              minHeight: "420px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "visible",
              background: "transparent",
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "pan-y",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            {/* Ambient glow */}

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: "42%",
                width: "78%",
                height: "58%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: isDark
                  ? "radial-gradient(ellipse at center, rgba(112, 182, 208, 0.16) 0%, rgba(50, 96, 113, 0.06) 42%, transparent 72%)"
                  : "radial-gradient(ellipse at center, rgba(50, 96, 113, 0.10) 0%, rgba(112, 182, 208, 0.04) 45%, transparent 72%)",
                filter: "blur(36px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Ground shadow */}

            <div
              aria-hidden="true"
              className="ds-signin-car-shadow"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "8%",
                width: "58%",
                height: "34px",
                transform: "translateX(-50%)",
                borderRadius: "50%",
                background: isDark
                  ? "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.18) 48%, transparent 74%)"
                  : "radial-gradient(ellipse at center, rgba(16, 24, 32, 0.20) 0%, rgba(16, 24, 32, 0.06) 50%, transparent 74%)",
                filter: "blur(12px)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Car images */}

            <div
              className="ds-signin-car-stack"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "720px",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                background: "transparent",
              }}
            >
              {carImages.map((src, index) => {
                const isActive = index === carIndex;

                return (
                  <img
                    key={src}
                    src={src}
                    alt="DriveShare vehicle"
                    draggable="false"
                    className="ds-signin-car-img"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center 62%",
                      background: "transparent",
                      display: "block",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 0.55s ease-in-out, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: isDragging ? "scale(1.02)" : "scale(1)",
                      zIndex: isActive ? 5 : 1,
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT - LOGIN ================= */}

        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              borderRadius: "24px",
              padding: "42px 38px",
              boxSizing: "border-box",
              boxShadow: isDark
                ? "0 25px 70px rgba(0,0,0,0.55)"
                : "0 20px 50px rgba(0,0,0,0.08)",
            }}
          >
            {/* TITLE */}

            <div style={{ marginBottom: "30px" }}>
              <div
                style={{
                  color: "var(--cyan-accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  marginBottom: "9px",
                }}
              >
                DRIVESHARE PROTOCOL // CLIENT ACCESS
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "34px",
                  lineHeight: "1.2",
                  fontWeight: 800,
                  color: "var(--primary-text)",
                }}
              >
                WELCOME BACK
              </h1>

              <p
                style={{
                  marginTop: "12px",
                  color: "var(--secondary-text)",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                <strong style={{ color: "var(--primary-text)" }}>
                  Your car. Your journey. Your driver.
                </strong>
                <br />
                Sign in to request a verified chauffeur for your personal
                vehicle.
              </p>
            </div>

            {/* FORM */}

            <form onSubmit={handleContinue}>
              <label
                style={{
                  display: "block",
                  marginBottom: "9px",
                  color: "var(--secondary-text)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Mobile Number
              </label>

              {/* PHONE INPUT */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  background: "var(--input-bg)",
                  border: error
                    ? "1px solid #ef4444"
                    : "1px solid var(--border-color)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    padding: "14px 15px",
                    borderRight: "1px solid var(--border-color)",
                    color: "var(--cyan-accent)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  🇮🇳 +91
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter mobile number"
                  maxLength={10}
                  autoFocus
                  autoComplete="tel"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    padding: "14px 15px",
                    color: "var(--primary-text)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "15px",
                  }}
                />
              </div>

              {/* ERROR */}

              {error && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "8px",
                    marginBottom: 0,
                  }}
                >
                  {error}
                </p>
              )}

              {/* CONTINUE */}

              <button
                type="submit"
                className="ds-btn-primary"
                disabled={sending}
                style={{
                  width: "100%",
                  marginTop: "22px",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  fontSize: "14px",
                  opacity: sending ? 0.75 : 1,
                  cursor: sending ? "wait" : "pointer",
                }}
              >
                {sending ? "CONTINUING..." : "CONTINUE"}

                {!sending && <ArrowRight size={18} />}
              </button>
            </form>

            {/* SECURITY BADGE */}

            <div
              style={{
                marginTop: "25px",
                paddingTop: "18px",
                borderTop: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-muted)",
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                textAlign: "center",
              }}
            >
              <Lock
                size={13}
                style={{
                  color: "var(--cyan-accent)",
                }}
              />

              SECURE CLIENT ACCESS
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}

      <footer
        style={{
          width: "100%",
          padding: "18px",
          boxSizing: "border-box",
          textAlign: "center",
          borderTop: "1px solid var(--border-color)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.05em",
        }}
      >
        DRIVESHARE AUTOMOTIVE PLATFORM // YOUR CAR • YOUR JOURNEY • YOUR
        DRIVER
      </footer>

      {/* ================= RESPONSIVE ================= */}

      <style>
        {`
          @media (max-width: 900px) {
            main {
              grid-template-columns: 1fr !important;
            }

            .ds-signin-car-col {
              order: 1;
            }

            main > div:last-child {
              order: 2;
            }

            .ds-signin-car-stage {
              min-height: 340px !important;
            }

            .ds-signin-car-stack {
              height: 320px !important;
            }
          }

          @media (max-width: 600px) {
            header {
              padding: 18px !important;
            }

            main {
              padding: 15px !important;
            }

            .ds-signin-car-stage {
              min-height: 260px !important;
            }

            .ds-signin-car-stack {
              height: 240px !important;
            }

            .ds-signin-car-shadow {
              width: 70% !important;
              height: 22px !important;
              bottom: 6% !important;
            }
          }
        `}
      </style>
    </div>
  );
}