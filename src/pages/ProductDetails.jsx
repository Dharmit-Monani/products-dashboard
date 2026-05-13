import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEdit, MdDelete, MdArrowBack, MdInventory } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi";
import toast from "react-hot-toast";
import { getProductById, deleteProduct } from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import ConfirmModal from "../components/ConfirmModal";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProductById(id);
      setProduct(res.data.data);
    } catch {
      setError("Product not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProduct(); }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(id);
      toast.success("Product deleted!");
      navigate("/products");
    } catch {
      toast.error("Failed to delete product.");
      setDeleting(false);
      setShowModal(false);
    }
  };

  if (loading) return <Loader text="Loading product details..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;

  const stockColor =
    product.stock === 0
      ? { bg: "#fef2f2", color: "#ef4444", label: "Out of Stock" }
      : product.stock < 10
      ? { bg: "#fffbeb", color: "#f59e0b", label: "Low Stock" }
      : { bg: "#f0fdf4", color: "#22c55e", label: "In Stock" };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.name}
        </div>

        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">{product.name}</h1>
            <p className="page-subtitle">Product Details</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <MdArrowBack /> Back
            </button>
            <Link to={`/products/edit/${id}`} className="btn btn-success">
              <MdEdit /> Edit
            </Link>
            <button className="btn btn-danger" onClick={() => setShowModal(true)}>
              <MdDelete /> Delete
            </button>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="detail-grid">
          {/* Left — Main Info */}
          <div className="card">
            <div className="detail-item">
              <p className="detail-label">Product Name</p>
              <p className="detail-value" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                {product.name}
              </p>
            </div>

            <div className="detail-item">
              <p className="detail-label">Description</p>
              <p className="detail-value" style={{ lineHeight: 1.7 }}>
                {product.description}
              </p>
            </div>

            <div className="detail-item">
              <p className="detail-label">Category</p>
              <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)", fontSize: "0.85rem", padding: "0.3rem 0.8rem" }}>
                {product.category || "General"}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="detail-item">
                <p className="detail-label">Created At</p>
                <p className="detail-value">
                  {new Date(product.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Last Updated</p>
                <p className="detail-value">
                  {new Date(product.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Right — Price & Stock */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Price Card */}
            <div className="card" style={{ textAlign: "center" }}>
              <p className="detail-label" style={{ marginBottom: "0.5rem" }}>Price</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", fontWeight: 800, fontSize: "2rem" }}>
                <HiCurrencyRupee />
                {product.price?.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Stock Card */}
            <div className="card" style={{ textAlign: "center" }}>
              <p className="detail-label" style={{ marginBottom: "0.5rem" }}>Stock Status</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "1.5rem", fontWeight: 800, color: stockColor.color }}>
                <MdInventory />
                {product.stock}
              </div>
              <span
                className="badge"
                style={{ background: stockColor.bg, color: stockColor.color, marginTop: "0.5rem", fontSize: "0.8rem" }}
              >
                {stockColor.label}
              </span>
            </div>

            {/* Total Value */}
            <div className="card" style={{ textAlign: "center", background: "var(--primary-light)" }}>
              <p className="detail-label" style={{ marginBottom: "0.4rem" }}>Total Inventory Value</p>
              <p style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--primary)" }}>
                ₹{(product.price * product.stock).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Product?"
        message={`Are you sure you want to delete "${product?.name}"? This cannot be undone.`}
      />
    </>
  );
};

export default ProductDetails;
