import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdAddBox } from "react-icons/md";
import toast from "react-hot-toast";
import { createProduct } from "../services/api";
import ProductForm from "../components/ProductForm";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createProduct(formData);
      toast.success("🎉 Product created successfully!");
      navigate("/products");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create product.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / Add New
      </div>

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Add New Product</h1>
          <p className="page-subtitle">Fill in the details to create a new product</p>
        </div>
        <MdAddBox size={32} color="var(--primary)" />
      </div>

      {/* Form Card */}
      <div className="card" style={{ maxWidth: 680 }}>
        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Create Product"
        />
      </div>
    </motion.div>
  );
};

export default CreateProduct;
