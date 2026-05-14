import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";  // NEW
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";    // NEW
import Signup from "./pages/Signup";  // NEW
import { useAuth } from "./context/AuthContext";  // NEW

function App() {
  const { isAuthenticated, loading } = useAuth();  // NEW

  // Dark mode state — saved in localStorage
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply dark mode to HTML element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDark = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Show nothing while checking auth — prevents flash
  if (loading) {
    return (
      <div className="loader-container" style={{ minHeight: "100vh" }}>
        <div className="spinner"></div>
        <p className="loader-text">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* ── Public Routes — no login needed ───────────────── */}
      <Route
        path="/login"
        element={
          // If already logged in, redirect to dashboard
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          // If already logged in, redirect to dashboard
          isAuthenticated ? <Navigate to="/" replace /> : <Signup />
        }
      />

      {/* ── Protected Routes — login required ─────────────── */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            {/* Dashboard layout with Navbar + Sidebar */}
            <div className="layout">
              <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
              <Navbar
                darkMode={darkMode}
                toggleDark={toggleDark}
                toggleSidebar={toggleSidebar}
              />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<AllProducts />} />
                  <Route path="/products/create" element={<CreateProduct />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/products/edit/:id" element={<EditProduct />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;