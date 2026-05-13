import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdHome, MdInventory } from "react-icons/md";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center", gap: "1rem" }}
    >
      <div style={{ fontSize: "5rem", lineHeight: 1 }}>🔍</div>

      <h1 style={{ fontSize: "5rem", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>
        404
      </h1>

      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)" }}>
        Page Not Found
      </h2>

      <p style={{ color: "var(--text-secondary)", maxWidth: 400, lineHeight: 1.6 }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
        <Link to="/" className="btn btn-primary btn-lg">
          <MdHome /> Go Home
        </Link>
        <Link to="/products" className="btn btn-secondary btn-lg">
          <MdInventory /> View Products
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
