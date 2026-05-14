import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdInventory, MdAddBox, MdTrendingUp, MdWarning, MdArrowForward,
} from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi";
import { getAllProducts } from "../services/api";
import { useAuth } from "../context/AuthContext";  // NEW
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  const { user } = useAuth();  // NEW — get logged in user
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllProducts();
      setProducts(res.data.data || []);
    } catch {
      setError("Failed to fetch products. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Stats calculations
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStock = products.filter((p) => p.stock < 10).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  const stats = [
    { label: "Total Products", value: totalProducts, icon: <MdInventory />, color: "#6366f1", bg: "#e0e7ff" },
    { label: "Total Inventory Value", value: `₹${totalValue.toLocaleString("en-IN")}`, icon: <HiCurrencyRupee />, color: "#22c55e", bg: "#f0fdf4" },
    { label: "Low Stock Items", value: lowStock, icon: <MdWarning />, color: "#f59e0b", bg: "#fffbeb" },
    { label: "Out of Stock", value: outOfStock, icon: <MdTrendingUp />, color: "#ef4444", bg: "#fef2f2" },
  ];

  if (loading) return <Loader text="Loading dashboard..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;

  // Get first name only — "Dharmit Monani" → "Dharmit"
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div>
      {/* Welcome Banner — dynamic name */}
      <motion.div
        className="welcome-banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>👋 Welcome, {firstName}!</h1>
        <p>Manage your products efficiently from your dashboard.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link to="/products/create" className="btn btn-primary">
            <MdAddBox /> Add New Product
          </Link>
          <Link to="/products" className="btn btn-secondary">
            <MdInventory /> View All Products
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700 }}>Recent Products</h2>
          <Link to="/products" className="btn btn-secondary btn-sm">
            View All <MdArrowForward />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p className="empty-title">No products yet</p>
            <p className="empty-subtitle">Add your first product to get started!</p>
            <Link to="/products/create" className="btn btn-primary" style={{ marginTop: "0.75rem" }}>
              <MdAddBox /> Add Product
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Name", "Category", "Price", "Stock", "Action"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "0.6rem 0.75rem", color: "var(--text-secondary)", fontWeight: 600, fontSize: "0.78rem", textTransform: "uppercase" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((p) => (
                  <tr key={p._id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 500 }}>{p.name}</td>
                    <td style={{ padding: "0.75rem" }}>
                      <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                        {p.category || "General"}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem", fontWeight: 600, color: "var(--primary)" }}>
                      ₹{p.price?.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <span className="badge" style={{
                        background: p.stock === 0 ? "#fef2f2" : p.stock < 10 ? "#fffbeb" : "#f0fdf4",
                        color: p.stock === 0 ? "#ef4444" : p.stock < 10 ? "#f59e0b" : "#22c55e",
                      }}>
                        {p.stock}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <Link to={`/products/${p._id}`} className="btn btn-secondary btn-sm">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;