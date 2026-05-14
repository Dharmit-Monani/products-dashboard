import { Link, useNavigate } from "react-router-dom";
import { HiMoon, HiSun, HiBell } from "react-icons/hi";
import { MdInventory, MdLogout } from "react-icons/md";
import { useAuth } from "../context/AuthContext";  // NEW
import toast from "react-hot-toast";

// Navbar — fixed top bar with brand, dark mode toggle, logout
const Navbar = ({ darkMode, toggleDark, toggleSidebar }) => {
  const { user, logout } = useAuth();   // NEW
  const navigate = useNavigate();       // NEW

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="navbar">
      {/* Left side — brand */}
      <Link to="/" className="navbar-brand">
        <MdInventory size={22} />
        <span>ProductsDB</span>
      </Link>

      {/* Right side — controls */}
      <div className="navbar-right">
        {/* Notification bell (decorative) */}
        <button className="theme-btn" aria-label="Notifications">
          <HiBell />
        </button>

        {/* Dark mode toggle */}
        <button
          className="theme-btn"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <HiSun /> : <HiMoon />}
        </button>

        {/* User avatar with name */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "default",
            flexShrink: 0,
          }}
          title={user?.name || "User"}
        >
          {/* Show initials from user name */}
          {user?.name
            ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
            : "U"}
        </div>

        {/* Logout button — NEW */}
        <button
          className="btn btn-danger btn-sm"
          onClick={handleLogout}
          title="Logout"
          style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
        >
          <MdLogout />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;