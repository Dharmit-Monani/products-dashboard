import { Link } from "react-router-dom";
import { HiMoon, HiSun, HiBell, HiMenuAlt2 } from "react-icons/hi";
import { MdInventory } from "react-icons/md";

// Navbar — fixed top bar with brand, dark mode toggle
const Navbar = ({ darkMode, toggleDark, toggleSidebar }) => {
  return (
    <nav className="navbar">
      {/* Left side — hamburger (mobile) */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          className="theme-btn"
          onClick={toggleSidebar}
          style={{ display: "none" }}
          aria-label="Toggle sidebar"
        >
          <HiMenuAlt2 />
        </button>

        <Link to="/" className="navbar-brand">
          <MdInventory size={22} />
          <span>ProductsDB</span>
        </Link>
      </div>

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

        {/* Avatar */}
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
            cursor: "pointer",
          }}
          title="Dharmit Monani"
        >
          DM
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
