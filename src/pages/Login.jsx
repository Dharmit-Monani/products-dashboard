import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdLogin, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrapper}>
      <motion.div
        style={s.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <div style={s.logoWrapper}>
          <div style={s.logoIcon}><HiShoppingBag size={26} color="white" /></div>
          <span style={s.logoText}>ProductsDB</span>
        </div>

        <h2 style={s.title}>Welcome back</h2>
        <p style={s.subtitle}>Sign in to your account to continue</p>

        {errors.general && <div style={s.errorBanner}>{errors.general}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={s.formGroup}>
            <label style={s.label}>Email Address <span style={{ color: "#ef4444" }}>*</span></label>
            <div style={s.inputWrap}>
              <MdEmail style={s.iconLeft} />
              <input
                type="email"
                name="email"
                style={{ ...s.input, ...(errors.email ? s.inputError : {}) }}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {errors.email && <p style={s.fieldError}>⚠ {errors.email}</p>}
          </div>

          {/* Password with show/hide */}
          <div style={s.formGroup}>
            <label style={s.label}>Password <span style={{ color: "#ef4444" }}>*</span></label>
            <div style={s.inputWrap}>
              <MdLock style={s.iconLeft} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                style={{ ...s.input, paddingRight: "2.8rem", ...(errors.password ? s.inputError : {}) }}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {/* Eye toggle button */}
              <button
                type="button"
                style={s.eyeBtn}
                onClick={() => setShowPassword((p) => !p)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
              </button>
            </div>
            {errors.password && <p style={s.fieldError}>⚠ {errors.password}</p>}
          </div>

          <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            <MdLogin size={18} />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={s.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={s.link}>Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

const s = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-main)",
    padding: "1rem",
  },
  card: {
    background: "var(--bg-card)",
    borderRadius: "20px",
    border: "1px solid var(--border)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "420px",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    justifyContent: "center",
    marginBottom: "1.75rem",
  },
  logoIcon: {
    width: 42,
    height: 42,
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)" },
  title: { fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", textAlign: "center", marginBottom: "0.3rem" },
  subtitle: { fontSize: "0.875rem", color: "var(--text-secondary)", textAlign: "center", marginBottom: "2rem" },
  errorBanner: {
    background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444",
    borderRadius: "10px", padding: "0.75rem 1rem", fontSize: "0.85rem", marginBottom: "1rem",
  },
  formGroup: { marginBottom: "1.25rem" },
  label: { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.4rem" },
  inputWrap: { position: "relative" },
  iconLeft: {
    position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)",
    color: "var(--text-light)", fontSize: "1.1rem", pointerEvents: "none",
  },
  input: {
    width: "100%", padding: "0.7rem 1rem 0.7rem 2.6rem",
    border: "1.5px solid var(--border)", borderRadius: "10px",
    fontSize: "0.9rem", color: "var(--text-primary)", background: "var(--bg-card)",
    outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  inputError: { borderColor: "#ef4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.1)" },
  eyeBtn: {
    position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer",
    color: "var(--text-secondary)", display: "flex", alignItems: "center", padding: 0,
  },
  fieldError: { fontSize: "0.78rem", color: "#ef4444", marginTop: "0.3rem" },
  submitBtn: {
    width: "100%", padding: "0.8rem",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "white", border: "none", borderRadius: "10px",
    fontSize: "0.95rem", fontWeight: 700, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "0.5rem", marginTop: "0.5rem", fontFamily: "Inter, sans-serif",
  },
  footer: { textAlign: "center", fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "1.5rem" },
  link: { color: "var(--primary)", fontWeight: 700, textDecoration: "none" },
};

export default Login;