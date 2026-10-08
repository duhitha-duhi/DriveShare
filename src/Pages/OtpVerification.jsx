
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DriveShareLogo from "../Components/DriveShareLogo";
import ThemeToggle from "../Components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";

export default function OTP() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const inputRefs = useRef([]);

  // ================= LOAD PHONE NUMBER =================

  useEffect(() => {
    const savedPhone = localStorage.getItem("driveSharePhone");

    if (!savedPhone) {
      navigate("/", { replace: true });
      return;
    }

    setPhone(savedPhone);
  }, [navigate]);

  // ================= OTP INPUT =================

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);
    setError("");

    // Move to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ================= BACKSPACE =================

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ================= PASTE OTP =================

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = ["", "", "", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setError("");

    const nextIndex = Math.min(pasted.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  // ================= VERIFY OTP =================

  const handleVerify = (e) => {
    e.preventDefault();

    if (verifying) return;

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter all 6 digits of the verification code.");
      return;
    }

    setVerifying(true);
    setError("");

    // Fixed verification code
    if (enteredOtp === "172224") {
      localStorage.setItem("driveShareLoggedIn", "true");
      localStorage.setItem("driveSharePhone", phone);

      setTimeout(() => {
        setVerifying(false);

        navigate("/home", {
          replace: true,
        });
      }, 500);
    } else {
      setVerifying(false);
      setError("Invalid verification code. Please try again.");
    }
  };

  // ================= CHANGE NUMBER =================

  const handleChangeNumber = () => {
    navigate("/", { replace: true });
  };

  // ================= MASK PHONE =================

  const maskedPhone =
    phone.length === 10
      ? `${phone.slice(0, 2)}******${phone.slice(-2)}`
      : phone;

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

        <ThemeToggle />
      </header>

      {/* ================= MAIN ================= */}

      <main
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 20px 50px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "470px",
          }}
        >
          {/* ================= CARD ================= */}

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

            <div
              style={{
                marginBottom: "32px",
              }}
            >
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
                DRIVESHARE PROTOCOL // VERIFICATION
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "32px",
                  lineHeight: "1.2",
                  fontWeight: 800,
                  color: "var(--primary-text)",
                }}
              >
                VERIFY YOUR NUMBER
              </h1>

              <p
                style={{
                  marginTop: "12px",
                  marginBottom: 0,
                  color: "var(--secondary-text)",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                Enter the 6-digit verification code to continue.
              </p>
            </div>

            {/* PHONE INFO */}

            <div
              style={{
                padding: "13px 15px",
                borderRadius: "10px",
                background: isDark
                  ? "rgba(50,96,113,0.12)"
                  : "#E9EFF4",
                border: "1px solid var(--border-color)",
                marginBottom: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.08em",
                    marginBottom: "4px",
                  }}
                >
                  MOBILE NUMBER
                </div>

                <strong
                  style={{
                    color: "var(--primary-text)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                  }}
                >
                  +91 {maskedPhone}
                </strong>
              </div>

              <button
                type="button"
                onClick={handleChangeNumber}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--cyan-accent)",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  padding: "5px",
                }}
              >
                CHANGE
              </button>
            </div>

            {/* OTP FORM */}

            <form onSubmit={handleVerify}>
              <label
                style={{
                  display: "block",
                  marginBottom: "12px",
                  color: "var(--secondary-text)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Verification Code
              </label>

              {/* OTP BOXES */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "9px",
                  width: "100%",
                }}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    style={{
                      width: "52px",
                      height: "58px",
                      boxSizing: "border-box",
                      textAlign: "center",
                      fontSize: "22px",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: "var(--primary-text)",
                      background: "var(--input-bg)",
                      border: error
                        ? "1px solid #ef4444"
                        : "1px solid var(--border-color)",
                      borderRadius: "10px",
                      outline: "none",
                    }}
                  />
                ))}
              </div>

              {/* ERROR */}

              {error && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "12px",
                    marginBottom: 0,
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}

              {/* VERIFY BUTTON */}

              <button
                type="submit"
                className="ds-btn-primary"
                disabled={verifying}
                style={{
                  width: "100%",
                  marginTop: "25px",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  fontSize: "14px",
                  opacity: verifying ? 0.75 : 1,
                  cursor: verifying ? "wait" : "pointer",
                }}
              >
                {verifying ? "VERIFYING..." : "VERIFY"}

                {!verifying && <ArrowRight size={18} />}
              </button>
            </form>

            {/* BACK */}

            <button
              type="button"
              onClick={handleChangeNumber}
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "12px",
                border: "none",
                background: "transparent",
                color: "var(--secondary-text)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "7px",
                fontSize: "12px",
              }}
            >
              <ArrowLeft size={15} />
              Change mobile number
            </button>

            {/* SECURITY */}

            <div
              style={{
                marginTop: "22px",
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
        DRIVESHARE AUTOMOTIVE PLATFORM // YOUR CAR • YOUR JOURNEY • YOUR DRIVER
      </footer>

      {/* ================= RESPONSIVE ================= */}

      <style>
        {`
          @media (max-width: 600px) {
            header {
              padding: 18px !important;
            }

            main {
              padding: 20px 15px 35px !important;
            }

            .otp-card {
              padding: 30px 20px !important;
            }
          }

          @media (max-width: 420px) {
            .otp-input {
              width: 43px !important;
              height: 52px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
