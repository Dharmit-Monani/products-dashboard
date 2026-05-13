import { useState } from "react";
import { MdSave, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Validation rules
const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Product name is required.";
  else if (data.name.trim().length > 100) errors.name = "Name cannot exceed 100 characters.";

  if (!data.description.trim()) errors.description = "Description is required.";
  else if (data.description.trim().length > 500) errors.description = "Description cannot exceed 500 characters.";

  if (data.price === "" || data.price === undefined) errors.price = "Price is required.";
  else if (Number(data.price) < 0) errors.price = "Price cannot be negative.";

  if (data.stock === "" || data.stock === undefined) errors.stock = "Stock is required.";
  else if (Number(data.stock) < 0) errors.stock = "Stock cannot be negative.";

  return errors;
};

// Reusable form for both Create and Edit
const ProductForm = ({ initialData, onSubmit, loading, submitLabel = "Save Product" }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price ?? "",
    stock: initialData?.stock ?? "",
    category: initialData?.category || "General",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Convert price and stock to numbers
    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  const categories = ["General", "Electronics", "Clothing", "Food", "Books", "Sports", "Beauty", "Home", "Toys", "Other"];

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div className="form-group">
        <label className="form-label">
          Product Name <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          className={`form-input ${errors.name ? "error" : ""}`}
          placeholder="e.g. Wireless Mouse"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="form-error">⚠ {errors.name}</p>}
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label">
          Description <span>*</span>
        </label>
        <textarea
          name="description"
          className={`form-textarea ${errors.description ? "error" : ""}`}
          placeholder="Write a short product description..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
        <div style={{ fontSize: "0.75rem", color: "var(--text-light)", textAlign: "right" }}>
          {formData.description.length}/500
        </div>
        {errors.description && <p className="form-error">⚠ {errors.description}</p>}
      </div>

      {/* Price & Stock */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Price (₹) <span>*</span>
          </label>
          <input
            type="number"
            name="price"
            className={`form-input ${errors.price ? "error" : ""}`}
            placeholder="e.g. 799"
            value={formData.price}
            onChange={handleChange}
            min="0"
          />
          {errors.price && <p className="form-error">⚠ {errors.price}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Stock Quantity <span>*</span>
          </label>
          <input
            type="number"
            name="stock"
            className={`form-input ${errors.stock ? "error" : ""}`}
            placeholder="e.g. 50"
            value={formData.stock}
            onChange={handleChange}
            min="0"
          />
          {errors.stock && <p className="form-error">⚠ {errors.stock}</p>}
        </div>
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-select"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          <MdArrowBack /> Back
        </button>
        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ flex: 1 }}>
          <MdSave />
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
