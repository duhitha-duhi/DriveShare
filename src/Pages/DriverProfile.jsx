import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_DRIVERS } from "../data/mockDrivers";
import { useTheme } from "../context/ThemeContext";
import {
  Star,
  ShieldCheck,
  Award,
  MapPin,
  ArrowLeft,
  Car,
  FileCheck,
  HeartHandshake,
  Send,
} from "lucide-react";

export default function DriverProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const driver =
    MOCK_DRIVERS.find((d) => d.id === id) || MOCK_DRIVERS[0];

  // Send driver request
  const handleDriverRequest = () => {
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
        background: "var(--bg-base)",
        color: "var(--primary-text)",
        minHeight: "100vh",
        padding: "40px 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Back Link */}
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
            <span>BACK TO DRIVER DIRECTORY</span>
          </button>
        </div>

        {/* Operational Principle */}
        <div
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(50, 96, 113, 0.3) 0%, rgba(18, 26, 41, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(50, 96, 113, 0.15) 0%, #FFFFFF 100%)",
            border: "1px solid var(--cyan-accent)",
            borderRadius: "16px",
            padding: "20px 28px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            boxShadow: "var(--shadow-main)",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "var(--cyan-dim)",
              border: "1px solid var(--cyan-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--cyan-accent)",
              flexShrink: 0,
            }}
          >
            <Car size={22} />
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
              DRIVESHARE OPERATIONAL PRINCIPLE //
            </div>

            <div
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--primary-text)",
                letterSpacing: "0.02em",
              }}
            >
              THIS DRIVER WILL DRIVE YOUR OWN VEHICLE.
            </div>

            <div
              style={{
                color: "var(--secondary-text)",
                fontSize: "13px",
              }}
            >
              The customer provides the car; {driver.name} provides
              professional, defensive chauffeur service.
            </div>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "24px",
            padding: "40px 36px",
            marginBottom: "36px",
            boxShadow: "var(--shadow-main)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "32px",
              alignItems: "center",
            }}
            className="driver-profile-header-grid"
          >
            {/* Driver Portrait */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "20px",
                overflow: "hidden",
                border: "2px solid var(--cyan-accent)",
                boxShadow: isDark
                  ? "0 0 25px rgba(112, 182, 208, 0.25)"
                  : "none",
                flexShrink: 0,
                position: "relative",
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
              />
            </div>

            {/* Core Details */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-main)",
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "var(--primary-text)",
                    margin: 0,
                  }}
                >
                  {driver.name}
                </h1>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    background: "var(--cyan-dim)",
                    border: "1px solid var(--cyan-accent)",
                    color: "var(--cyan-accent)",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                  }}
                >
                  <ShieldCheck size={14} />
                  GOVT RTO VERIFIED
                </span>

                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    background: "rgba(74, 222, 128, 0.15)",
                    border: "1px solid rgba(74, 222, 128, 0.3)",
                    color: "#4ade80",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                  }}
                >
                  {driver.availability}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: "var(--secondary-text)",
                  fontSize: "14px",
                  marginBottom: "14px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "var(--primary-text)",
                  }}
                >
                  <Star
                    size={16}
                    style={{
                      color: "#facc15",
                      fill: "#facc15",
                    }}
                  />

                  <strong>{driver.rating}</strong>

                  <span
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    ({driver.reviewCount} reviews)
                  </span>
                </span>

                <span>•</span>

                <span>{driver.experience}</span>

                <span>•</span>

                <span>{driver.trips}</span>

                <span>•</span>

                <span>📍 {driver.location}</span>

                <span>•</span>

                <span
                  style={{
                    color: "var(--cyan-accent)",
                    fontWeight: 600,
                  }}
                >
                  {driver.eta || "Arrives in 6 min"}
                </span>
              </div>

              <p
                style={{
                  color: "var(--secondary-text)",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  maxWidth: "680px",
                }}
              >
                {driver.bio}
              </p>
            </div>

            {/* Price Box */}
            <div
              style={{
                background: "var(--bg-main)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center",
                minWidth: "220px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--secondary-text)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                STANDARD SERVICE FEE
              </div>

              <div
                style={{
                  fontFamily: "var(--font-main)",
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "var(--cyan-accent)",
                  marginBottom: "6px",
                }}
              >
                {driver.price}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "16px",
                }}
              >
                Full Day: {driver.pricePerDay}
              </div>

              {/* SEND DRIVER REQUEST */}
              <button
                type="button"
                className="ds-btn-primary"
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "13px",
                }}
                onClick={handleDriverRequest}
              >
                <span>SEND DRIVER REQUEST</span>
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Credentials & Trust Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "32px",
          }}
          className="driver-details-grid"
        >
          {/* LEFT COLUMN */}
          <div>
            {/* Safety & Verification */}
            <div
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "28px",
                marginBottom: "28px",
              }}
            >
              <div
                className="tech-label"
                style={{
                  marginBottom: "14px",
                }}
              >
                SAFETY & VERIFICATION CREDENTIALS //
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {/* License */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px",
                    padding: "14px",
                  }}
                >
                  <FileCheck
                    size={20}
                    style={{
                      color: "var(--cyan-accent)",
                      marginTop: "2px",
                    }}
                  />

                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "var(--primary-text)",
                      }}
                    >
                      Driving License Verified
                    </strong>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-text)",
                      }}
                    >
                      RTO Active Commercial & Non-Transport
                    </span>
                  </div>
                </div>

                {/* Police Clearance */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px",
                    padding: "14px",
                  }}
                >
                  <ShieldCheck
                    size={20}
                    style={{
                      color: "var(--cyan-accent)",
                      marginTop: "2px",
                    }}
                  />

                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "var(--primary-text)",
                      }}
                    >
                      Police Clearance Checked
                    </strong>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-text)",
                      }}
                    >
                      Clean Criminal Background Record
                    </span>
                  </div>
                </div>

                {/* Defensive Driving */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px",
                    padding: "14px",
                  }}
                >
                  <Award
                    size={20}
                    style={{
                      color: "var(--cyan-accent)",
                      marginTop: "2px",
                    }}
                  />

                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "var(--primary-text)",
                      }}
                    >
                      Defensive Driving Certified
                    </strong>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-text)",
                      }}
                    >
                      Trained in Highway Emergency Control
                    </span>
                  </div>
                </div>

                {/* Vehicle Care */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px",
                    padding: "14px",
                  }}
                >
                  <HeartHandshake
                    size={20}
                    style={{
                      color: "var(--cyan-accent)",
                      marginTop: "2px",
                    }}
                  />

                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "var(--primary-text)",
                      }}
                    >
                      Owner Vehicle Care Protocol
                    </strong>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-text)",
                      }}
                    >
                      Smooth clutch, zero harsh acceleration
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Expertise */}
            <div
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "28px",
                marginBottom: "28px",
              }}
            >
              <div
                className="tech-label"
                style={{
                  marginBottom: "14px",
                }}
              >
                VEHICLE TRANSMISSION & CHASSIS EXPERTISE //
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {(
                  driver.vehicleExpertise || [
                    "Luxury SUVs",
                    "Automatic",
                    "Manual",
                    "EVs",
                  ]
                ).map((exp, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
                      background: "var(--cyan-dim)",
                      border: "1px solid var(--border-color)",
                      color: "var(--primary-text)",
                      fontSize: "13px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
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
                  marginBottom: "20px",
                }}
              >
                <div className="tech-label">
                  VERIFIED VEHICLE OWNER REVIEWS //
                </div>

                <span
                  style={{
                    color: "var(--cyan-accent)",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  ★ {driver.rating} / 5.0
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {(driver.reviews || []).map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "12px",
                      padding: "18px 20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            fontSize: "14px",
                            color: "var(--primary-text)",
                          }}
                        >
                          {rev.author}
                        </strong>

                        <span
                          style={{
                            color: "var(--cyan-accent)",
                            fontSize: "12px",
                            marginLeft: "8px",
                          }}
                        >
                          ({rev.car})
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {rev.date}
                      </span>
                    </div>

                    <p
                      style={{
                        color: "var(--secondary-text)",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* Service Hubs */}
            <div
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "28px",
                marginBottom: "28px",
              }}
            >
              <div
                className="tech-label"
                style={{
                  marginBottom: "14px",
                }}
              >
                SERVICE HUBS & CORRIDORS //
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {(
                  driver.serviceAreas || [
                    "Tenali",
                    "Guntur",
                    "Vijayawada",
                  ]
                ).map((area, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "var(--secondary-text)",
                      fontSize: "13px",
                    }}
                  >
                    <MapPin
                      size={15}
                      style={{
                        color: "var(--cyan-accent)",
                      }}
                    />

                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "28px",
                marginBottom: "28px",
              }}
            >
              <div
                className="tech-label"
                style={{
                  marginBottom: "14px",
                }}
              >
                LANGUAGES SPOKEN //
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {(driver.languages || ["English", "Telugu"]).map(
                  (lang, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "4px",
                        background: "var(--bg-main)",
                        border: "1px solid var(--border-color)",
                        color: "var(--primary-text)",
                        fontSize: "12px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {lang}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}