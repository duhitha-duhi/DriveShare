import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("driveShareLoggedIn") === "true";

    const phone =
      localStorage.getItem("driveSharePhone") || "";

    if (loggedIn) {
      setUser({
        phoneNumber: phone ? `+91${phone}` : "",
      });
    } else {
      setUser(null);
    }

    setAuthReady(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("driveShareLoggedIn");
    localStorage.removeItem("driveSharePhone");

    sessionStorage.removeItem("driveSharePendingPhone");

    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      authReady,
      isLoggedIn: Boolean(user),
      logout,
    }),
    [user, authReady]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}