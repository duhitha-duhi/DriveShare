import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_USER_VEHICLES, MOCK_DRIVERS } from "../data/mockDrivers";
import { useTheme } from "../context/ThemeContext";
import {
  Edit2,
  LogOut,
  Plus,
  Trash2,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();

  // User details
  const [name, setName] = useState("Gavini Duhitha");
  const [phone, setPhone] = useState(
    localStorage.getItem("driveSharePhone") || "+91 98480 22119"
  );
  const [email, setEmail] = useState(
    "duhitha.gavini@driveshare.network"
  );
  const [location, setLocation] = useState("Tenali, Andhra Pradesh");
  const [isEditing, setIsEditing] = useState(false);

  // Saved Vehicles
  const [vehicles, setVehicles] = useState(MOCK_USER_VEHICLES);
  const [newVehicleModal, setNewVehicleModal] = useState(false);

  const [newCar, setNewCar] = useState({
    nickname: "",
    makeModel: "",
    registration: "",
    transmission: "Automatic (AT)",
    fuelType: "Petrol",
  });

  // Bookings
  const bookings =
    JSON.parse(localStorage.getItem("driveShareBookings")) || [];

  const totalBookings = bookings.length;

  const completedTrips = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("driveShareLoggedIn");
    localStorage.removeItem("driveSharePhone");

    navigate("/", { replace: true });
  };

  // Add Vehicle
  const handleAddVehicle = (e) => {
    e.preventDefault();

    if (!newCar.makeModel || !newCar.registration) {
      return;
    }

    const added = {
      id: `veh-${Date.now()}`,
      nickname: newCar.nickname || "My Car",
      makeModel: newCar.makeModel,
      registration: newCar.registration.toUpperCase(),
      transmission: newCar.transmission,
      fuelType: newCar.fuelType,
      year: "2024",
      isPrimary: false,
    };

    setVehicles([...vehicles, added]);

    setNewVehicleModal(false);

    setNewCar({
      nickname: "",
      makeModel: "",
      registration: "",
      transmission: "Automatic (AT)",
      fuelType: "Petrol",
    });
  };

  // Delete Vehicle
  const handleDeleteVehicle = (id) => {
    setVehicles(
      vehicles.filter((vehicle) => vehicle.id !== id)
    );
  };

  return (
    <div
      style={{
        background: isDark
          ? "var(--bg-base)"
          : "var(--bg-secondary)",
        color: "var(--primary-text)",
        minHeight: "100vh",
        padding: "40px 24px 80px",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ================= PROFILE HEADER ================= */}

        <div
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(18, 26, 41, 0.95) 0%, rgba(12, 18, 31, 0.95) 100%)"
              : "#FFFFFF",
            border: `1px solid ${
              isDark
                ? "var(--border-strong)"
                : "var(--border-subtle)"
            }`,
            borderRadius: "24px",
            padding: "36px 32px",
            marginBottom: "36px",
            boxShadow: isDark
              ? "0 20px 50px rgba(4, 7, 12, 0.7)"
              : "0 10px 30px rgba(16, 24, 32, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}

            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "20px",
                background: isDark
                  ? "linear-gradient(135deg, #326071 0%, #162638 100%)"
                  : "linear-gradient(135deg, #70B6D0 0%, #326071 100%)",
                border: `2px solid ${
                  isDark
                    ? "var(--cyan-accent)"
                    : "var(--blue-teal)"
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: 800,
                color: "#FFFFFF",
                boxShadow: isDark
                  ? "0 0 25px rgba(112, 182, 208, 0.25)"
                  : "0 8px 20px rgba(50, 96, 113, 0.2)",
                flexShrink: 0,
              }}
            >
              GD
            </div>

            {/* User Info */}

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                  flexWrap: "wrap",
                }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-main)",
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "var(--primary-text)",
                    margin: 0,
                  }}
                >
                  {name}
                </h1>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: isDark
                      ? "rgba(112, 182, 208, 0.15)"
                      : "rgba(50, 96, 113, 0.1)",
                    border: `1px solid ${
                      isDark
                        ? "var(--cyan-accent)"
                        : "var(--blue-teal)"
                    }`,
                    color: isDark
                      ? "var(--cyan-accent)"
                      : "var(--blue-teal)",
                    fontWeight: 600,
                  }}
                >
                  VERIFIED CAR OWNER
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: "var(--secondary-text)",
                  fontSize: "13px",
                  flexWrap: "wrap",
                }}
              >
                <span>📱 {phone}</span>
                <span>•</span>
                <span>📍 {location}</span>
                <span>•</span>
                <span>✉️ {email}</span>
              </div>
            </div>
          </div>

          {/* Header Buttons */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              className="ds-btn-secondary"
              onClick={() => setIsEditing(!isEditing)}
              style={{
                padding: "10px 16px",
                fontSize: "12px",
              }}
            >
              <Edit2 size={14} />

              <span>
                {isEditing ? "Save Profile" : "Edit Profile"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "8px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#f87171",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <LogOut size={15} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* ================= EDIT PROFILE ================= */}

        {isEditing && (
          <div
            style={{
              background: isDark
                ? "rgba(18, 26, 41, 0.85)"
                : "#FFFFFF",
              border: `1px solid ${
                isDark
                  ? "var(--cyan-accent)"
                  : "var(--blue-teal)"
              }`,
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "32px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              boxShadow: isDark
                ? "none"
                : "0 4px 16px rgba(16,24,32,0.06)",
            }}
          >
            {/* Name */}

            <div>
              <label
                style={{
                  fontSize: "11px",
                  color: "var(--secondary-text)",
                  textTransform: "uppercase",
                }}
              >
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: isDark
                    ? "var(--bg-secondary)"
                    : "#F4F7FA",
                  border: `1px solid ${
                    isDark
                      ? "var(--border-strong)"
                      : "var(--border-subtle)"
                  }`,
                  borderRadius: "6px",
                  color: "var(--primary-text)",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              />
            </div>

            {/* Phone */}

            <div>
              <label
                style={{
                  fontSize: "11px",
                  color: "var(--secondary-text)",
                  textTransform: "uppercase",
                }}
              >
                Phone Number
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: isDark
                    ? "var(--bg-secondary)"
                    : "#F4F7FA",
                  border: `1px solid ${
                    isDark
                      ? "var(--border-strong)"
                      : "var(--border-subtle)"
                  }`,
                  borderRadius: "6px",
                  color: "var(--primary-text)",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              />
            </div>

            {/* Email */}

            <div>
              <label
                style={{
                  fontSize: "11px",
                  color: "var(--secondary-text)",
                  textTransform: "uppercase",
                }}
              >
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: isDark
                    ? "var(--bg-secondary)"
                    : "#F4F7FA",
                  border: `1px solid ${
                    isDark
                      ? "var(--border-strong)"
                      : "var(--border-subtle)"
                  }`,
                  borderRadius: "6px",
                  color: "var(--primary-text)",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              />
            </div>

            {/* Location */}

            <div>
              <label
                style={{
                  fontSize: "11px",
                  color: "var(--secondary-text)",
                  textTransform: "uppercase",
                }}
              >
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: isDark
                    ? "var(--bg-secondary)"
                    : "#F4F7FA",
                  border: `1px solid ${
                    isDark
                      ? "var(--border-strong)"
                      : "var(--border-subtle)"
                  }`,
                  borderRadius: "6px",
                  color: "var(--primary-text)",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              />
            </div>
          </div>
        )}

        {/* ================= STATISTICS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          {[
            {
              title: "Total Driver Requests",
              value: totalBookings || 3,
            },
            {
              title: "Completed Journeys",
              value: completedTrips || 2,
            },
            {
              title: "Hours Driven in Your Cars",
              value: "28.5 hrs",
            },
            {
              title: "Client Trust Rating",
              value: "4.98 ★",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              style={{
                background: isDark
                  ? "rgba(18, 26, 41, 0.85)"
                  : "#FFFFFF",
                border: `1px solid ${
                  isDark
                    ? "var(--border-strong)"
                    : "var(--border-subtle)"
                }`,
                borderRadius: "14px",
                padding: "20px",
                boxShadow: isDark
                  ? "none"
                  : "0 4px 16px rgba(16,24,32,0.04)",
              }}
            >
              <div
                style={{
                  color: "var(--secondary-text)",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {stat.title}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: isDark
                    ? "var(--cyan-accent)"
                    : "var(--blue-teal)",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* ================= THEME SETTINGS ================= */}

        <div
          style={{
            background: isDark
              ? "rgba(18, 26, 41, 0.85)"
              : "#FFFFFF",
            border: `1px solid ${
              isDark
                ? "var(--border-strong)"
                : "var(--border-subtle)"
            }`,
            borderRadius: "16px",
            padding: "28px 32px",
            marginBottom: "36px",
            boxShadow: isDark
              ? "none"
              : "0 4px 16px rgba(16,24,32,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <div
                className="tech-label"
                style={{
                  marginBottom: "4px",
                  color: isDark
                    ? "var(--cyan-accent)"
                    : "var(--blue-teal)",
                }}
              >
                PLATFORM PREFERENCES //
              </div>

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "var(--primary-text)",
                  margin: "0 0 6px",
                }}
              >
                Theme & Interface Appearance
              </h2>

              <p
                style={{
                  color: "var(--secondary-text)",
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                Choose between Deep Automotive Dark Mode or Clean
                High-Contrast Light Mode.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {/* Light */}

              <button
                type="button"
                onClick={() => isDark && toggleTheme()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  background: !isDark
                    ? "rgba(50, 96, 113, 0.15)"
                    : "transparent",
                  border: !isDark
                    ? "1px solid var(--blue-teal)"
                    : "1px solid var(--border-strong)",
                  color: !isDark
                    ? "var(--blue-teal)"
                    : "var(--secondary-text)",
                }}
              >
                <Sun size={16} />
                <span>☀️ Light Mode</span>
              </button>

              {/* Dark */}

              <button
                type="button"
                onClick={() => !isDark && toggleTheme()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  background: isDark
                    ? "rgba(112, 182, 208, 0.15)"
                    : "transparent",
                  border: isDark
                    ? "1px solid var(--cyan-accent)"
                    : "1px solid var(--border-subtle)",
                  color: isDark
                    ? "var(--cyan-accent)"
                    : "var(--secondary-text)",
                }}
              >
                <Moon size={16} />
                <span>🌙 Dark Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= SAVED VEHICLES ================= */}

        <div
          style={{
            background: isDark
              ? "rgba(18, 26, 41, 0.85)"
              : "#FFFFFF",
            border: `1px solid ${
              isDark
                ? "var(--border-strong)"
                : "var(--border-subtle)"
            }`,
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "36px",
            boxShadow: isDark
              ? "none"
              : "0 4px 16px rgba(16,24,32,0.04)",
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
            <div>
              <div
                className="tech-label"
                style={{
                  marginBottom: "4px",
                  color: isDark
                    ? "var(--cyan-accent)"
                    : "var(--blue-teal)",
                }}
              >
                REGISTERED GARAGE //
              </div>

              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "var(--primary-text)",
                  margin: 0,
                }}
              >
                My Saved Vehicles
              </h2>
            </div>

            <button
              type="button"
              className="ds-btn-primary"
              style={{
                padding: "8px 16px",
                fontSize: "12px",
              }}
              onClick={() => setNewVehicleModal(true)}
            >
              <Plus size={14} />
              <span>Add Vehicle</span>
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {vehicles.map((car) => (
              <div
                key={car.id}
                style={{
                  background: isDark
                    ? "var(--bg-secondary)"
                    : "#F4F7FA",
                  border: `1px solid ${
                    isDark
                      ? "var(--border-strong)"
                      : "var(--border-subtle)"
                  }`,
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "10px",
                          fontFamily: "var(--font-mono)",
                          color: isDark
                            ? "var(--cyan-accent)"
                            : "var(--blue-teal)",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {car.nickname}
                      </span>

                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "var(--primary-text)",
                          margin: 0,
                        }}
                      >
                        {car.makeModel}
                      </h3>
                    </div>

                    {car.isPrimary && (
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: isDark
                            ? "rgba(112, 182, 208, 0.15)"
                            : "rgba(50, 96, 113, 0.1)",
                          color: isDark
                            ? "var(--cyan-accent)"
                            : "var(--blue-teal)",
                          fontWeight: 600,
                        }}
                      >
                        PRIMARY
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--secondary-text)",
                      marginBottom: "12px",
                    }}
                  >
                    Reg:{" "}
                    <strong
                      style={{
                        color: "var(--primary-text)",
                      }}
                    >
                      {car.registration}
                    </strong>
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--secondary-text)",
                    }}
                  >
                    {car.transmission} • {car.fuelType}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "16px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteVehicle(car.id)
                    }
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--secondary-text)",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                    title="Remove Vehicle"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FAVOURITE DRIVERS ================= */}

        <div
          style={{
            background: isDark
              ? "rgba(18, 26, 41, 0.85)"
              : "#FFFFFF",
            border: `1px solid ${
              isDark
                ? "var(--border-strong)"
                : "var(--border-subtle)"
            }`,
            borderRadius: "16px",
            padding: "32px",
            boxShadow: isDark
              ? "none"
              : "0 4px 16px rgba(16,24,32,0.04)",
          }}
        >
          <div
            className="tech-label"
            style={{
              marginBottom: "4px",
              color: isDark
                ? "var(--cyan-accent)"
                : "var(--blue-teal)",
            }}
          >
            PREFERRED CHAUFFEURS //
          </div>

          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "var(--primary-text)",
              marginBottom: "20px",
            }}
          >
            Favourite Verified Drivers
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {MOCK_DRIVERS.slice(0, 2).map((driver) => (
              <div
                key={driver.id}
                style={{
                  background: isDark
                    ? "var(--bg-secondary)"
                    : "#F4F7FA",
                  border: `1px solid ${
                    isDark
                      ? "var(--border-strong)"
                      : "var(--border-subtle)"
                  }`,
                  borderRadius: "12px",
                  padding: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "var(--primary-text)",
                        margin: 0,
                      }}
                    >
                      {driver.name}
                    </h3>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-text)",
                      }}
                    >
                      ★ {driver.rating} • {driver.experience}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="ds-btn-primary"
                  style={{
                    padding: "8px 14px",
                    fontSize: "11px",
                  }}
                  onClick={() =>
                    navigate(`/request/${driver.id}`)
                  }
                >
                  <span>Request Driver</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ADD VEHICLE MODAL ================= */}

        {newVehicleModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "20px",
            }}
            onClick={() => setNewVehicleModal(false)}
          >
            <div
              style={{
                background: isDark
                  ? "var(--bg-secondary)"
                  : "#FFFFFF",
                border: `1px solid ${
                  isDark
                    ? "var(--cyan-accent)"
                    : "var(--blue-teal)"
                }`,
                borderRadius: "20px",
                padding: "36px",
                maxWidth: "480px",
                width: "100%",
                boxShadow: isDark
                  ? "0 25px 60px rgba(0,0,0,0.9)"
                  : "0 20px 50px rgba(16,24,32,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "var(--primary-text)",
                  marginBottom: "16px",
                }}
              >
                Add Vehicle to Garage
              </h3>

              <form onSubmit={handleAddVehicle}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    marginBottom: "24px",
                  }}
                >
                  {/* Nickname */}

                  <div>
                    <label
                      style={{
                        fontSize: "11px",
                        color: "var(--secondary-text)",
                        textTransform: "uppercase",
                      }}
                    >
                      Vehicle Nickname
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. City SUV / Highway Fortuner"
                      value={newCar.nickname}
                      onChange={(e) =>
                        setNewCar({
                          ...newCar,
                          nickname: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: isDark
                          ? "var(--bg-base)"
                          : "#F4F7FA",
                        border: `1px solid ${
                          isDark
                            ? "var(--border-strong)"
                            : "var(--border-subtle)"
                        }`,
                        borderRadius: "6px",
                        color: "var(--primary-text)",
                        marginTop: "4px",
                      }}
                    />
                  </div>

                  {/* Make Model */}

                  <div>
                    <label
                      style={{
                        fontSize: "11px",
                        color: "var(--secondary-text)",
                        textTransform: "uppercase",
                      }}
                    >
                      Make & Model *
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="e.g. Toyota Innova Hycross"
                      value={newCar.makeModel}
                      onChange={(e) =>
                        setNewCar({
                          ...newCar,
                          makeModel: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: isDark
                          ? "var(--bg-base)"
                          : "#F4F7FA",
                        border: `1px solid ${
                          isDark
                            ? "var(--border-strong)"
                            : "var(--border-subtle)"
                        }`,
                        borderRadius: "6px",
                        color: "var(--primary-text)",
                        marginTop: "4px",
                      }}
                    />
                  </div>

                  {/* Registration */}

                  <div>
                    <label
                      style={{
                        fontSize: "11px",
                        color: "var(--secondary-text)",
                        textTransform: "uppercase",
                      }}
                    >
                      Registration Number *
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="e.g. AP 07 XY 9876"
                      value={newCar.registration}
                      onChange={(e) =>
                        setNewCar({
                          ...newCar,
                          registration: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: isDark
                          ? "var(--bg-base)"
                          : "#F4F7FA",
                        border: `1px solid ${
                          isDark
                            ? "var(--border-strong)"
                            : "var(--border-subtle)"
                        }`,
                        borderRadius: "6px",
                        color: "var(--primary-text)",
                        marginTop: "4px",
                      }}
                    />
                  </div>

                  {/* Transmission + Fuel */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontSize: "11px",
                          color: "var(--secondary-text)",
                          textTransform: "uppercase",
                        }}
                      >
                        Transmission
                      </label>

                      <select
                        value={newCar.transmission}
                        onChange={(e) =>
                          setNewCar({
                            ...newCar,
                            transmission: e.target.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: isDark
                            ? "var(--bg-base)"
                            : "#F4F7FA",
                          border: `1px solid ${
                            isDark
                              ? "var(--border-strong)"
                              : "var(--border-subtle)"
                          }`,
                          borderRadius: "6px",
                          color: "var(--primary-text)",
                          marginTop: "4px",
                        }}
                      >
                        <option value="Automatic (AT)">
                          Automatic (AT)
                        </option>

                        <option value="Manual (MT)">
                          Manual (MT)
                        </option>

                        <option value="Dual Clutch (DCT)">
                          Dual Clutch (DCT)
                        </option>

                        <option value="EV Single-Speed">
                          EV Single-Speed
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          fontSize: "11px",
                          color: "var(--secondary-text)",
                          textTransform: "uppercase",
                        }}
                      >
                        Fuel Type
                      </label>

                      <select
                        value={newCar.fuelType}
                        onChange={(e) =>
                          setNewCar({
                            ...newCar,
                            fuelType: e.target.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: isDark
                            ? "var(--bg-base)"
                            : "#F4F7FA",
                          border: `1px solid ${
                            isDark
                              ? "var(--border-strong)"
                              : "var(--border-subtle)"
                          }`,
                          borderRadius: "6px",
                          color: "var(--primary-text)",
                          marginTop: "4px",
                        }}
                      >
                        <option value="Diesel">Diesel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Electric (EV)">
                          Electric (EV)
                        </option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Modal Buttons */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                  }}
                >
                  <button
                    type="button"
                    className="ds-btn-secondary"
                    onClick={() =>
                      setNewVehicleModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="ds-btn-primary"
                  >
                    Save Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}