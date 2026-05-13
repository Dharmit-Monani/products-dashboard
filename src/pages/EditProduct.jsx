import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { getProductById, updateProduct } from "../services/api";
import ProductForm from "../components/ProductForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing product data
  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProductById(id);
      setProduct(res.data.data);
    } catch {
      setError("Product not found or server error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProduct(); }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await updateProduct(id, formData);
      toast.success("✅ Product updated successfully!");
      navigate(`/products/${id}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update product.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader text="Loading product..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /
        <Link to={`/products/${id}`}>{product?.name}</Link> / Edit
      </div>

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Product</h1>
          <p className="page-subtitle">Update the details for "{product?.name}"</p>
        </div>
        <MdEdit size={32} color="var(--primary)" />
      </div>

      {/* Form Card */}
      <div className="card" style={{ maxWidth: 680 }}>
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          loading={submitting}
          submitLabel="Update Product"
        />
      </div>
    </motion.div>
  );
};

export default EditProduct;
