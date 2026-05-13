import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdAddBox, MdRefresh } from "react-icons/md";
import { HiSearch } from "react-icons/hi";
import { getAllProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { SkeletonCard } from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search, filter, sort state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllProducts();
      setProducts(res.data.data || []);
    } catch {
      setError("Could not load products. Make sure your backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Callback for ProductCard to remove deleted item from list
  const handleDeleted = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category || "General"))];
    return ["All", ...cats];
  }, [products]);

  // Filter + search + sort
  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== "All") {
      result = result.filter((p) => (p.category || "General") === category);
    }

    // Sort
    switch (sort) {
      case "price-asc":  result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "name-asc":   result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "stock-asc":  result.sort((a, b) => a.stock - b.stock); break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">All Products</h1>
          <p className="page-subtitle">{products.length} products in total</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-secondary" onClick={fetchProducts} disabled={loading}>
            <MdRefresh /> Refresh
          </button>
          <Link to="/products/create" className="btn btn-primary">
            <MdAddBox /> Add Product
          </Link>
        </div>
      </div>

      {/* Search + Filter + Sort Bar */}
      <div className="filter-bar">
        {/* Search */}
        <div className="search-box">
          <HiSearch />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="filter-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="stock-asc">Stock: Low to High</option>
        </select>
      </div>

      {/* Error State */}
      {error && <ErrorMessage message={error} onRetry={fetchProducts} />}

      {/* Loading Skeletons */}
      {loading && (
        <div className="products-grid">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-title">No products found</p>
          <p className="empty-subtitle">
            {search || category !== "All"
              ? "Try different search terms or filters."
              : "Add your first product to get started!"}
          </p>
          {!search && category === "All" && (
            <Link to="/products/create" className="btn btn-primary" style={{ marginTop: "0.75rem" }}>
              <MdAddBox /> Add Product
            </Link>
          )}
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Showing {filtered.length} of {products.length} products
          </p>
          <motion.div className="products-grid" layout>
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDeleted={handleDeleted}
              />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
