import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import AutomotiveHeroCanvas from "../Components/AutomotiveHeroCanvas";
import DriverCard from "../Components/DriverCard";
import DriveShareLogo from "../Components/DriveShareLogo";
import ThemeToggle from "../Components/ThemeToggle";

import { MOCK_DRIVERS } from "../data/mockDrivers";
import { useTheme } from "../context/ThemeContext";

import {
  Car,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Navigation,
  Home as HomeIcon,
  Search,
  Users,
  ClipboardList,
  UserCircle,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [activeCarAngle, setActiveCarAngle] = useState(0);
  const [becomeDriverModal, setBecomeDriverModal] = useState(false);

  // Mouse Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrame;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const x =
        (e.clientX - innerWidth / 2) /
        (innerWidth / 2);

      const y =
        (e.clientY - innerHeight / 2) /
        (innerHeight / 2);

      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Check DriveShare car image
  const [carImageAvailable, setCarImageAvailable] =
    useState(false);

  useEffect(() => {
    const testImg = new Image();

    testImg.src = "/images/driveshare-car.png";

    testImg.onload = () =>
      setCarImageAvailable(true);

    testImg.onerror = () =>
      setCarImageAvailable(false);
  }, []);

  // Car views
  const carViews = [
    {
      label: "Front 3/4",
      src: "/images/Car/Car-front-right.jpg",
    },
    {
      label: "Direct Front",
      src: "/images/Car/Car-front.jpg",
    },
    {
      label: "Side Profile",
      src: "/images/Car/Car-right.jpg",
    },
    {
      label: "Rear 3/4",
      src: "/images/Car/Car-rear-right.jpg",
    },
  ];

  return (
    <div
      style={{
        background: "var(--bg-base)",
        color: "var(--primary-text)",
        minHeight: "100vh",
      }}
    >

      {/* =========================================================
          DRIVESHARE NAVBAR
      ========================================================= */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "76px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          background: isDark
            ? "rgba(8, 13, 22, 0.88)"
            : "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom:
            "1px solid var(--border-color)",
          zIndex: 100,
        }}
      >

        {/* LOGO */}
        <Link
          to="/home"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <DriveShareLogo />
        </Link>


        {/* NAVIGATION */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flex: 1,
            justifyContent: "center",
            marginLeft: "25px",
          }}
        >

          {/* HOME */}
          <Link
            to="/home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "11px 15px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "var(--cyan-accent)",
              background: "var(--cyan-dim)",
              fontFamily: "var(--font-main)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <HomeIcon size={15} />
            <span>HOME</span>
          </Link>


          {/* REQUEST DRIVER */}
          <Link
            to="/request-driver"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "11px 15px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "var(--secondary-text)",
              fontFamily: "var(--font-main)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <Search size={15} />
            <span>REQUEST DRIVER</span>
          </Link>


          {/* DRIVERS */}
          <Link
            to="/drivers"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "11px 15px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "var(--secondary-text)",
              fontFamily: "var(--font-main)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <Users size={15} />
            <span>DRIVERS</span>
          </Link>


          {/* MY TRIPS */}
          <Link
            to="/bookings"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "11px 15px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "var(--secondary-text)",
              fontFamily: "var(--font-main)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <ClipboardList size={15} />
            <span>MY TRIPS</span>
          </Link>


          {/* PROFILE */}
          <Link
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "11px 15px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "var(--secondary-text)",
              fontFamily: "var(--font-main)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <UserCircle size={15} />
            <span>PROFILE</span>
          </Link>

        </nav>


        {/* RIGHT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >

          {/* THEME TOGGLE */}
          <ThemeToggle />


          {/* PROFILE */}
          <Link
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 11px",
              borderRadius: "22px",
              textDecoration: "none",
              background: "var(--bg-surface)",
              border:
                "1px solid var(--border-color)",
              color: "var(--primary-text)",
              fontFamily: "var(--font-main)",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >

            <span
              style={{
                width: "29px",
                height: "29px",
                borderRadius: "50%",
                background: "var(--cyan-dim)",
                color: "var(--cyan-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              GD
            </span>

            <span>Gavini D.</span>

          </Link>

        </div>

      </header>


      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section
        style={{
          position: "relative",
          minHeight: "94vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "90px 24px 70px",
          overflow: "hidden",
          borderBottom:
            "1px solid var(--border-color)",
        }}
      >

        <AutomotiveHeroCanvas />


        {/* PRIMARY SOFT GLOW */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform:
              "translate(-50%, -20%)",
            width: "720px",
            height: "440px",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(112, 182, 208, 0.12) 0%, rgba(50, 96, 113, 0.04) 50%, transparent 75%)"
              : "radial-gradient(ellipse at center, rgba(50, 96, 113, 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />


        {/* CAR STAGE GLOW */}
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "260px",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(112, 182, 208, 0.16) 0%, rgba(50, 96, 113, 0.06) 45%, transparent 75%)"
              : "radial-gradient(ellipse at center, rgba(50, 96, 113, 0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />


        {/* VIGNETTE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(8, 13, 22, 0.85) 100%)"
              : "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(244, 247, 250, 0.75) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />


        {/* GPS ROUTES */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
            opacity: isDark ? 0.35 : 0.22,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >

          <path
            d="M -120 420 C 240 280, 680 520, 1480 320"
            fill="none"
            stroke={
              isDark
                ? "#70B6D0"
                : "#326071"
            }
            strokeWidth="1.2"
            strokeDasharray="4 8"
          />

          <path
            d="M 120 80 C 480 220, 840 140, 1500 480"
            fill="none"
            stroke={
              isDark
                ? "#326071"
                : "#70B6D0"
            }
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          <circle
            cx="480"
            cy="220"
            r="3.5"
            fill="#70B6D0"
          />

          <circle
            cx="480"
            cy="220"
            r="8"
            fill="none"
            stroke="#70B6D0"
            strokeWidth="0.8"
            strokeOpacity="0.7"
          />

          <circle
            cx="840"
            cy="140"
            r="3"
            fill="#70B6D0"
          />

          <circle
            cx="840"
            cy="140"
            r="7"
            fill="none"
            stroke="#70B6D0"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />

        </svg>


        {/* =========================================================
            FLOATING CARD 1
        ========================================================= */}
        <div
          className="floating-hero-card"
          style={{
            position: "absolute",
            top: "14%",
            left: "8%",
            zIndex: 3,
            background: "var(--card-bg)",
            backdropFilter: "blur(14px)",
            border:
              "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "var(--shadow-main)",
            transform: `translate3d(
              ${mousePos.x * -18}px,
              ${mousePos.y * -14}px,
              0
            )`,
            transition:
              "transform 0.15s ease-out",
          }}
        >

          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--cyan-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--cyan-accent)",
            }}
          >
            <ShieldCheck size={18} />
          </div>

          <div>

            <div
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                color: "var(--cyan-accent)",
                fontWeight: 700,
              }}
            >
              DRIVER VERIFIED
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--primary-text)",
              }}
            >
              4.9 ★ • 8+ YRS EXPERIENCE
            </div>

          </div>

        </div>


        {/* =========================================================
            FLOATING CARD 2
        ========================================================= */}
        <div
          className="floating-hero-card"
          style={{
            position: "absolute",
            top: "18%",
            right: "9%",
            zIndex: 3,
            background: "var(--card-bg)",
            backdropFilter: "blur(14px)",
            border:
              "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "var(--shadow-main)",
            transform: `translate3d(
              ${mousePos.x * 22}px,
              ${mousePos.y * -12}px,
              0
            )`,
            transition:
              "transform 0.15s ease-out",
          }}
        >

          <span className="status-dot" />

          <div>

            <div
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                color: "var(--cyan-accent)",
                fontWeight: 700,
              }}
            >
              AVAILABLE NOW
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--primary-text)",
              }}
            >
              ARRIVES IN 6 MIN • 2.4 KM AWAY
            </div>

          </div>

        </div>


        {/* =========================================================
            FLOATING CARD 3
        ========================================================= */}
        <div
          className="floating-hero-card"
          style={{
            position: "absolute",
            bottom: "16%",
            left: "10%",
            zIndex: 3,
            background: "var(--card-bg)",
            backdropFilter: "blur(14px)",
            border:
              "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "var(--shadow-main)",
            transform: `translate3d(
              ${mousePos.x * -14}px,
              ${mousePos.y * 20}px,
              0
            )`,
            transition:
              "transform 0.15s ease-out",
          }}
        >

          <Navigation
            size={18}
            style={{
              color: "var(--cyan-accent)",
            }}
          />

          <div>

            <div
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                color: "var(--secondary-text)",
              }}
            >
              TRIP
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--primary-text)",
              }}
            >
              TENALI → HYDERABAD
            </div>

          </div>

        </div>


        {/* =========================================================
            FLOATING CARD 4
        ========================================================= */}
        <div
          className="floating-hero-card"
          style={{
            position: "absolute",
            bottom: "18%",
            right: "8%",
            zIndex: 3,
            background: "var(--card-bg)",
            backdropFilter: "blur(14px)",
            border:
              "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "var(--shadow-main)",
            transform: `translate3d(
              ${mousePos.x * 16}px,
              ${mousePos.y * 18}px,
              0
            )`,
            transition:
              "transform 0.15s ease-out",
          }}
        >

          <Car
            size={18}
            style={{
              color: "var(--cyan-accent)",
            }}
          />

          <div>

            <div
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                color: "var(--secondary-text)",
              }}
            >
              YOUR VEHICLE
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--primary-text)",
              }}
            >
              SUV • PERSONAL
            </div>

          </div>

        </div>


        {/* DRIVER AVATAR 1 */}
        <div
          className="floating-driver-bubble"
          style={{
            position: "absolute",
            top: "32%",
            left: "4%",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            overflow: "hidden",
            border:
              "2px solid var(--cyan-accent)",
            boxShadow:
              "0 0 20px rgba(112, 182, 208, 0.3)",
            zIndex: 3,
            transform: `translate3d(
              ${mousePos.x * -25}px,
              ${mousePos.y * -8}px,
              0
            )`,
            transition:
              "transform 0.2s ease-out",
          }}
          title="Verified Driver"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Verified Driver"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>


        {/* DRIVER AVATAR 2 */}
        <div
          className="floating-driver-bubble"
          style={{
            position: "absolute",
            top: "38%",
            right: "5%",
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            overflow: "hidden",
            border:
              "2px solid var(--cyan-accent)",
            boxShadow:
              "0 0 20px rgba(112, 182, 208, 0.3)",
            zIndex: 3,
            transform: `translate3d(
              ${mousePos.x * 24}px,
              ${mousePos.y * 10}px,
              0
            )`,
            transition:
              "transform 0.2s ease-out",
          }}
          title="Verified Driver"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            alt="Verified Driver"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>


        {/* =========================================================
            CENTER HERO CONTENT
        ========================================================= */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          {/* BADGE */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "20px",
              background: "var(--bg-surface)",
              border:
                "1px solid var(--cyan-accent)",
              color: "var(--cyan-accent)",
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "26px",
              boxShadow: isDark
                ? "0 0 25px rgba(112, 182, 208, 0.2)"
                : "none",
            }}
          >
            <span className="status-dot" />

            <span>
              EXECUTIVE CHAUFFEUR PROTOCOL FOR CAR OWNERS
            </span>
          </div>


          {/* MAIN HEADING */}
          <h1
            style={{
              fontFamily: "var(--font-main)",
              fontSize:
                "clamp(40px, 6.2vw, 76px)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--primary-text)",
              marginBottom: "22px",
              textTransform: "uppercase",
            }}
          >

            YOUR CAR.
            <br />

            <span
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #70B6D0 0%, #326071 100%)"
                  : "linear-gradient(135deg, #326071 0%, #70B6D0 100%)",
                WebkitBackgroundClip:
                  "text",
                WebkitTextFillColor:
                  "transparent",
              }}
            >
              YOUR JOURNEY.
            </span>

            <br />

            YOUR DRIVER.

          </h1>


          {/* DESCRIPTION */}
          <p
            style={{
              fontFamily: "var(--font-main)",
              fontSize:
                "clamp(16px, 1.8vw, 20px)",
              color: "var(--secondary-text)",
              maxWidth: "680px",
              lineHeight: 1.6,
              marginBottom: "36px",
            }}
          >
            Request a verified driver to drive your own vehicle wherever you need to go.
            You supply the car; our background-checked chauffeur takes the wheel.
          </p>


          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "44px",
            }}
          >

            <button
              type="button"
              className="ds-btn-primary"
              onClick={() =>
                navigate("/find-driver")
              }
              style={{
                padding: "16px 36px",
                fontSize: "15px",
                letterSpacing: "0.06em",
              }}
            >
              <span>FIND A DRIVER</span>
              <ArrowRight size={18} />
            </button>


            <button
              type="button"
              className="ds-btn-secondary"
              onClick={() =>
                setBecomeDriverModal(true)
              }
              style={{
                padding: "16px 28px",
                fontSize: "15px",
                letterSpacing: "0.06em",
              }}
            >
              <span>BECOME A DRIVER</span>
            </button>

          </div>


          {/* =========================================================
              HERO VEHICLE
          ========================================================= */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "680px",
              height: "230px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translate3d(
                ${mousePos.x * 12}px,
                ${mousePos.y * 8}px,
                0
              )`,
              transition:
                "transform 0.25s ease-out",
              marginTop: "8px",
            }}
            className="hero-vehicle-stage"
          >

            {/* GROUND GLOW */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                width: "480px",
                height: "90px",
                borderRadius: "50%",
                background: isDark
                  ? "radial-gradient(ellipse at center, rgba(112, 182, 208, 0.3) 0%, rgba(50, 96, 113, 0.15) 50%, transparent 75%)"
                  : "radial-gradient(ellipse at center, rgba(50, 96, 113, 0.18) 0%, rgba(112, 182, 208, 0.08) 50%, transparent 75%)",
                filter: "blur(24px)",
                pointerEvents: "none",
              }}
            />


            {carImageAvailable ? (

              <img
                src="/images/driveshare-car.png"
                alt="DriveShare Client Vehicle"
                style={{
                  maxHeight: "190px",
                  maxWidth: "92%",
                  objectFit: "contain",
                  filter: isDark
                    ? "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 16px rgba(112, 182, 208, 0.25))"
                    : "drop-shadow(0 15px 25px rgba(16, 24, 32, 0.25))",
                  animation:
                    "heroVehicleFloat 6s ease-in-out infinite",
                  position: "relative",
                  zIndex: 2,
                }}
              />

            ) : (

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "520px",
                  height: "170px",
                  borderRadius: "18px",
                  background: isDark
                    ? "linear-gradient(135deg, rgba(18, 26, 41, 0.75) 0%, rgba(12, 18, 31, 0.85) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(233, 239, 244, 0.8) 100%)",
                  border: `1px solid ${
                    isDark
                      ? "rgba(112, 182, 208, 0.3)"
                      : "rgba(50, 96, 113, 0.25)"
                  }`,
                  boxShadow: isDark
                    ? "0 15px 40px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(112, 182, 208, 0.08)"
                    : "0 10px 30px rgba(16, 24, 32, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter:
                    "blur(12px)",
                  zIndex: 2,
                }}
              >

                <svg
                  width="220"
                  height="64"
                  viewBox="0 0 220 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    opacity: isDark
                      ? 0.85
                      : 0.65,
                    filter: isDark
                      ? "drop-shadow(0 0 10px rgba(112, 182, 208, 0.45))"
                      : "none",
                    marginBottom: "12px",
                  }}
                >

                  <path
                    d="M12 48C20 48 24 38 32 38C40 38 44 48 56 48H164C176 48 180 38 188 38C196 38 200 48 208 48H214C216 48 218 46 217 44C214 36 208 32 198 30L178 26L148 14C140 10 128 8 110 8H80C68 8 58 14 52 24L34 28C24 30 14 36 8 44C6.5 46 8.5 48 12 48Z"
                    stroke={
                      isDark
                        ? "#70B6D0"
                        : "#326071"
                    }
                    strokeWidth="1.6"
                    fill={
                      isDark
                        ? "rgba(112, 182, 208, 0.06)"
                        : "rgba(50, 96, 113, 0.04)"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M58 24L74 13C80 11 92 10 110 10H144C152 10 158 13 162 18L174 26"
                    stroke={
                      isDark
                        ? "#70B6D0"
                        : "#326071"
                    }
                    strokeWidth="1.2"
                    strokeOpacity="0.75"
                    strokeDasharray="2 4"
                  />

                  <circle
                    cx="32"
                    cy="42"
                    r="8"
                    stroke={
                      isDark
                        ? "#70B6D0"
                        : "#326071"
                    }
                    strokeWidth="1.4"
                    strokeOpacity="0.8"
                  />

                  <circle
                    cx="32"
                    cy="42"
                    r="3"
                    fill={
                      isDark
                        ? "#70B6D0"
                        : "#326071"
                    }
                    fillOpacity="0.8"
                  />

                  <circle
                    cx="188"
                    cy="42"
                    r="8"
                    stroke={
                      isDark
                        ? "#70B6D0"
                        : "#326071"
                    }
                    strokeWidth="1.4"
                    strokeOpacity="0.8"
                  />

                  <circle
                    cx="188"
                    cy="42"
                    r="3"
                    fill={
                      isDark
                        ? "#70B6D0"
                        : "#326071"
                    }
                    fillOpacity="0.8"
                  />

                  <line
                    x1="214"
                    y1="36"
                    x2="220"
                    y2="36"
                    stroke="#70B6D0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <line
                    x1="8"
                    y1="36"
                    x2="2"
                    y2="36"
                    stroke="#f87171"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeOpacity="0.7"
                  />

                </svg>


                <div
                  style={{
                    textAlign: "center",
                  }}
                >

                  <div
                    style={{
                      fontFamily:
                        "var(--font-mono)",
                      fontSize: "11px",
                      color: isDark
                        ? "var(--cyan-accent)"
                        : "var(--blue-teal)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform:
                        "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    VEHICLE STAGE PREPARED //
                  </div>

                  <div
                    style={{
                      fontFamily:
                        "var(--font-main)",
                      fontSize: "13px",
                      color:
                        "var(--secondary-text)",
                    }}
                  >
                    Ready for your car image at{" "}
                    <code
                      style={{
                        color:
                          "var(--primary-text)",
                        background:
                          "rgba(112, 182, 208, 0.1)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      /public/images/driveshare-car.png
                    </code>
                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =========================================================
          DRIVESHARE CONCEPT
      ========================================================= */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >

        <div
          style={{
            background: "var(--card-bg)",
            border:
              "1px solid var(--border-color)",
            borderRadius: "24px",
            padding: "44px 36px",
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "40px",
            alignItems: "center",
            boxShadow:
              "var(--shadow-main)",
          }}
          className="concept-banner-grid"
        >

          <div>

            <div
              className="tech-label"
              style={{
                marginBottom: "12px",
              }}
            >
              THE DRIVESHARE PARADIGM //
            </div>

            <h2
              style={{
                fontFamily:
                  "var(--font-main)",
                fontSize: "32px",
                fontWeight: 800,
                color:
                  "var(--primary-text)",
                lineHeight: "1.25",
                marginBottom: "20px",
              }}
            >
              Why ride in an unfamiliar cab when you already own your vehicle?
            </h2>

            <p
              style={{
                color:
                  "var(--secondary-text)",
                fontSize: "15px",
                lineHeight: "1.7",
                marginBottom: "24px",
              }}
            >
              DriveShare solves the exact friction of vehicle ownership: long fatigue-filled highway routes, bumper-to-bumper city jams, late-night events, or outstation family trips. You provide the car; our verified chauffeurs take the wheel.
            </p>


            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <CheckCircle2
                  size={18}
                  style={{
                    color:
                      "var(--cyan-accent)",
                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    fontSize: "14px",
                    color:
                      "var(--primary-text)",
                  }}
                >
                  <strong>
                    Your Personal Vehicle:
                  </strong>{" "}
                  Maintain your comfort, familiar acoustics, luggage space, and privacy.
                </span>
              </div>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <CheckCircle2
                  size={18}
                  style={{
                    color:
                      "var(--cyan-accent)",
                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    fontSize: "14px",
                    color:
                      "var(--primary-text)",
                  }}
                >
                  <strong>
                    Verified Driving Service Only:
                  </strong>{" "}
                  No cab fleet. You request only the professional driver.
                </span>
              </div>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <CheckCircle2
                  size={18}
                  style={{
                    color:
                      "var(--cyan-accent)",
                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    fontSize: "14px",
                    color:
                      "var(--primary-text)",
                  }}
                >
                  <strong>
                    On-Demand or Advance Request:
                  </strong>{" "}
                  Request a driver on the spot or schedule days ahead.
                </span>
              </div>

            </div>

          </div>


          {/* VEHICLE INSPECTOR */}
          <div
            style={{
              background:
                "var(--bg-main)",
              border:
                "1px solid var(--border-color)",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
              position: "relative",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "16px",
                fontSize: "11px",
                fontFamily:
                  "var(--font-mono)",
                color:
                  "var(--cyan-accent)",
              }}
            >
              <span>
                CLIENT VEHICLE SPEC
              </span>

              <span>
                WHITE SILVER METALLIC SUV
              </span>
            </div>


            <div
              style={{
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
              }}
            >
              <img
                src={
                  carViews[activeCarAngle]
                    .src
                }
                alt="DriveShare Vehicle"
                style={{
                  maxHeight: "190px",
                  maxWidth: "100%",
                  objectFit: "contain",
                  filter: isDark
                    ? "drop-shadow(0 15px 25px rgba(0,0,0,0.8))"
                    : "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
                }}
              />
            </div>


            <div
              style={{
                display: "flex",
                justifyContent:
                  "center",
                gap: "8px",
                marginTop: "16px",
                flexWrap: "wrap",
              }}
            >

              {carViews.map(
                (item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setActiveCarAngle(
                        idx
                      )
                    }
                    style={{
                      padding:
                        "6px 12px",
                      borderRadius:
                        "6px",
                      background:
                        activeCarAngle ===
                        idx
                          ? "var(--cyan-dim)"
                          : "var(--bg-surface)",
                      border:
                        activeCarAngle ===
                        idx
                          ? "1px solid var(--cyan-accent)"
                          : "1px solid var(--border-color)",
                      color:
                        activeCarAngle ===
                        idx
                          ? "var(--cyan-accent)"
                          : "var(--secondary-text)",
                      fontFamily:
                        "var(--font-mono)",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FEATURED DRIVERS
      ========================================================= */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "20px 24px 80px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "flex-end",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >

          <div>

            <div
              className="tech-label"
              style={{
                marginBottom: "8px",
              }}
            >
              CHAUFFEUR DIRECTORY //
            </div>

            <h2
              style={{
                fontFamily:
                  "var(--font-main)",
                fontSize: "34px",
                fontWeight: 800,
                color:
                  "var(--primary-text)",
                margin: 0,
              }}
            >
              Verified Professional Drivers Near You
            </h2>

          </div>


          <Link
            to="/drivers"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color:
                "var(--cyan-accent)",
              fontFamily:
                "var(--font-mono)",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            <span>
              VIEW ALL DRIVERS
            </span>

            <ArrowRight size={16} />
          </Link>

        </div>


        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >

          {MOCK_DRIVERS
            .slice(0, 3)
            .map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
              />
            ))}

        </div>

      </section>


      {/* =========================================================
          FINAL ACTION BANNER
      ========================================================= */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto 80px",
          padding: "0 24px",
        }}
      >

        <div
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(50, 96, 113, 0.35) 0%, rgba(18, 26, 41, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(50, 96, 113, 0.15) 0%, #FFFFFF 100%)",
            border:
              "1px solid var(--cyan-accent)",
            borderRadius: "24px",
            padding: "50px 40px",
            textAlign: "center",
            boxShadow:
              "var(--shadow-main)",
            position: "relative",
          }}
        >

          <div
            className="tech-label"
            style={{
              marginBottom: "12px",
            }}
          >
            READY FOR YOUR NEXT JOURNEY? //
          </div>


          <h2
            style={{
              fontFamily:
                "var(--font-main)",
              fontSize:
                "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color:
                "var(--primary-text)",
              marginBottom: "16px",
            }}
          >
            Don't stress over the driving.
            <br />
            Request a verified driver for your own car.
          </h2>


          <p
            style={{
              color:
                "var(--secondary-text)",
              fontSize: "16px",
              maxWidth: "580px",
              margin:
                "0 auto 32px",
            }}
          >
            Available 24/7 across Tenali, Guntur, Vijayawada, and highway intercity routes.
          </p>


          <button
            type="button"
            className="ds-btn-primary"
            onClick={() =>
              navigate("/find-driver")
            }
            style={{
              padding: "16px 36px",
              fontSize: "15px",
            }}
          >
            <span>
              REQUEST A DRIVER NOW
            </span>

            <ArrowRight size={18} />
          </button>

        </div>

      </section>


      {/* =========================================================
          BECOME DRIVER MODAL
      ========================================================= */}
      {becomeDriverModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0, 0, 0, 0.8)",
            backdropFilter:
              "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() =>
            setBecomeDriverModal(false)
          }
        >

          <div
            style={{
              maxWidth: "520px",
              width: "100%",
              background:
                "var(--bg-main)",
              border:
                "1px solid var(--cyan-accent)",
              borderRadius: "20px",
              padding: "36px",
              boxShadow:
                "var(--shadow-main)",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div
              className="tech-label"
              style={{
                marginBottom: "8px",
              }}
            >
              CHAUFFEUR ONBOARDING //
            </div>


            <h3
              style={{
                fontFamily:
                  "var(--font-main)",
                fontSize: "24px",
                fontWeight: 800,
                color:
                  "var(--primary-text)",
                marginBottom: "12px",
              }}
            >
              Join the DriveShare Elite Driver Network
            </h3>


            <p
              style={{
                color:
                  "var(--secondary-text)",
                fontSize: "14px",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              Are you an experienced driver with a valid commercial/personal license and a clean record? Earn premium rates driving well-maintained customer-owned vehicles.
            </p>


            <div
              style={{
                background:
                  "var(--bg-surface)",
                border:
                  "1px solid var(--border-color)",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "24px",
                display: "flex",
                flexDirection:
                  "column",
                gap: "10px",
                fontSize: "13px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems:
                    "center",
                }}
              >
                <CheckCircle2
                  size={16}
                  style={{
                    color:
                      "var(--cyan-accent)",
                  }}
                />

                <span>
                  Minimum 3+ years four-wheeler driving experience
                </span>
              </div>


              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems:
                    "center",
                }}
              >
                <CheckCircle2
                  size={16}
                  style={{
                    color:
                      "var(--cyan-accent)",
                  }}
                />

                <span>
                  Valid Driving License & Police Clearance
                </span>
              </div>


              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems:
                    "center",
                }}
              >
                <CheckCircle2
                  size={16}
                  style={{
                    color:
                      "var(--cyan-accent)",
                  }}
                />

                <span>
                  Defensive driving trained & client vehicle respect
                </span>
              </div>

            </div>


            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent:
                  "flex-end",
              }}
            >

              <button
                type="button"
                className="ds-btn-secondary"
                onClick={() =>
                  setBecomeDriverModal(
                    false
                  )
                }
              >
                Close
              </button>


              <button
                type="button"
                className="ds-btn-primary"
                onClick={() => {
                  alert(
                    "Application submitted! DriveShare Driver Partner Operations will contact you."
                  );

                  setBecomeDriverModal(
                    false
                  );
                }}
              >
                Apply as Driver
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}