import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";

// Pages
import Home from "./Pages/Home";
import FindDriver from "./Pages/FindDriver";
import Drivers from "./Pages/Drivers";
import DriverProfile from "./Pages/DriverProfile";
import BookDriver from "./Pages/BookDriver";
import RequestDriver from "./Pages/RequestDriverFlow";
import Bookings from "./Pages/Bookings";
import BookingConfirmation from "./Pages/BookingConfirmation";
import Profile from "./Pages/Profile";

// Authentication
import SignIn from "./Pages/SignIn";
import OtpVerification from "./Pages/OtpVerification";

// Context
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";


// ======================================================
// PROTECTED ROUTE
// ======================================================

function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("driveShareLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}


// ======================================================
// APP
// ======================================================

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>

        <Routes>

          {/* ==================================================
              SIGN IN / OTP
          ================================================== */}

          <Route
            path="/"
            element={<SignIn />}
          />

          <Route
            path="/login"
            element={<SignIn />}
          />

          <Route
            path="/signin"
            element={<SignIn />}
          />

          <Route
            path="/otp-verification"
            element={<OtpVerification />}
          />


          {/* ==================================================
              HOME
          ================================================== */}

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              FIND DRIVER
          ================================================== */}

          <Route
            path="/find-driver"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <FindDriver />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              DRIVERS
          ================================================== */}

          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Drivers />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              DRIVER PROFILE
          ================================================== */}

          <Route
            path="/driver-profile/:id"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <DriverProfile />
                </>
              </ProtectedRoute>
            }
          />

          {/* Compatibility route */}
          <Route
            path="/driver/:id"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <DriverProfile />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              BOOK DRIVER
          ================================================== */}

          <Route
            path="/book-driver/:id"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BookDriver />
                </>
              </ProtectedRoute>
            }
          />

          {/* Compatibility route */}
          <Route
            path="/book-driver"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BookDriver />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              REQUEST DRIVER
          ================================================== */}

          <Route
            path="/request-driver"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <RequestDriver />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/request-driver/:id"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <RequestDriver />
                </>
              </ProtectedRoute>
            }
          />

          {/* Compatibility route */}
          <Route
            path="/request/:id"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <RequestDriver />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              BOOKINGS
          ================================================== */}

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Bookings />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              BOOKING CONFIRMATION
          ================================================== */}

          <Route
            path="/booking-confirmation"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BookingConfirmation />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              PROFILE
          ================================================== */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Profile />
                </>
              </ProtectedRoute>
            }
          />


          {/* ==================================================
              UNKNOWN ROUTE
          ================================================== */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;