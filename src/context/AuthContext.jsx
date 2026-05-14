import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ─── Axios instance with credentials ─────────────────────────
// withCredentials: true — cookies ko cross-origin requests mein bhejna zaroori hai
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // httpOnly cookie automatically send hoga
});

// ─── Create Context ───────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Auth Provider ────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true on first load — checking auth

  // On app load — check if user is already logged in via cookie
  useEffect(() => {
    checkAuth();
  }, []);

  // Hit /api/auth/me — if cookie is valid, user is returned
  const checkAuth = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.user);
    } catch {
      // Cookie missing or expired — user is not logged in
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ─── Login ─────────────────────────────────────────────────
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    setUser(res.data.user);
    return res.data;
  };

  // ─── Signup ────────────────────────────────────────────────
  const signup = async (name, email, password, confirmPassword) => {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
    });
    setUser(res.data.user);
    return res.data;
  };

  // ─── Logout ────────────────────────────────────────────────
  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  // ─── Expose values ─────────────────────────────────────────
  const value = {
    user,
    isAuthenticated: !!user, // true if user exists
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─── Custom hook — easy access in any component ───────────────
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export default AuthContext;
