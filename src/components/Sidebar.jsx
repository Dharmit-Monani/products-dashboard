import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdAddBox,
  MdInfo,
} from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";

// Sidebar nav links config
const navLinks = [
  { to: "/", label: "Dashboard", icon: <MdDashboard />, end: true },
  { to: "/products", label: "All Products", icon: <MdInventory /> },
  { to: "/products/create", label: "Add Product", icon: <MdAddBox /> },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 98,
            display: "none",
          }}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand in sidebar */}
        <div className="sidebar-logo">
          <HiShoppingBag size={22} color="var(--primary)" />
          <span>Products Dashboard</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-label">Main Menu</div>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}

          {/* Info section */}
          <div className="sidebar-label" style={{ marginTop: "1.5rem" }}>
            Info
          </div>

          <div
            style={{
              padding: "1rem",
              background: "var(--primary-light)",
              borderRadius: "var(--radius-sm)",
              marginTop: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--primary)",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "0.4rem",
              }}
            >
              <MdInfo />
              Alfido Tech Internship
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              MERN Stack Task 2<br />
              By Dharmit Monani
            </p>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
