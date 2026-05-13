import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEdit, MdDelete, MdVisibility, MdInventory } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
import { deleteProduct } from "../services/api";

// ProductCard — displays one product in grid view
const ProductCard = ({ product, onDeleted }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Handle delete with confirmation
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product._id);
      toast.success("Product deleted successfully!");
      setShowModal(false);
      onDeleted(product._id); // tell parent to remove from list
    } catch (err) {
      toast.error("Failed to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  // Stock badge color
  const stockColor =
    product.stock === 0
      ? { bg: "#fef2f2", color: "#ef4444" }
      : product.stock < 10
      ? { bg: "#fffbeb", color: "#f59e0b" }
      : { bg: "#f0fdf4", color: "#22c55e" };

  return (
    <>
      <motion.div
        className="product-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        layout
      >
        {/* Header */}
        <div className="product-card-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-category">{product.category || "General"}</span>
        </div>

        {/* Description */}
        <p className="product-description">
          {product.description || "No description provided."}
        </p>

        {/* Price & Stock */}
        <div className="product-meta">
          <div className="product-price" style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
            <HiCurrencyRupee size={18} />
            {product.price?.toLocaleString("en-IN")}
          </div>
          <span
            className="badge"
            style={{ background: stockColor.bg, color: stockColor.color }}
          >
            <MdInventory style={{ marginRight: "0.3rem" }} />
            Stock: {product.stock}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(`/products/${product._id}`)}
            title="View Details"
          >
            <MdVisibility /> View
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={() => navigate(`/products/edit/${product._id}`)}
            title="Edit Product"
          >
            <MdEdit /> Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setShowModal(true)}
            title="Delete Product"
          >
            <MdDelete /> Delete
          </button>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Product?"
        message={`Are you sure you want to delete "${product.name}"? This cannot be undone.`}
      />
    </>
  );
};

export default ProductCard;
