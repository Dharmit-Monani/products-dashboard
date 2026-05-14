import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdEmail, MdLock, MdPerson, MdPersonAdd,
  MdVisibility, MdVisibilityOff, MdCheck, MdClose,
} from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// ─── Password rules ───────────────────────────────────────────
const rules = [
  { id: "length",    label: "Minimum 8 characters",      test: (p) => p.length >= 8 },
  { id: "uppercase", label: "At least 1 uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "number",    label: "At least 1 number",          test: (p) => /[0-9]/.test(p) },
  { id: "special",   label: "At least 1 special character", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

// ─── Password strength calculation ───────────────────────────
const getStrength = (password) => {
  const passed = rules.filter((r) => r.test(password)).length;
  if (!password) return { level: 0, label: "", color: "" };
  if (passed <= 1)  return { level: 1, label: "Weak",   color: "#ef4444" };
  if (passed <= 2)  return { level: 2, label: "Fair",   color: "#f97316" };
  if (passed === 3) return { level: 3, label: "Medium", color: "#eab308" };
  return             { level: 4, label: "Strong", color: "#22c55e" };
};

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const strength = getStrength(formData.password);
  const passedRules = rules.filter((r) => r.test(formData.password));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email.";

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (passedRules.length < 4) {
      newErrors.password = "Password does not meet all requirements.";
    }

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

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
      await signup(formData.name, formData.email, formData.password, formData.confirmPassword);
      toast.success("Account created! Welcome!");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed. Please try again.";
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

        <h2 style={s.title}>Create your account</h2>
        <p style={s.subtitle}>Start managing your products today</p>

        {errors.general && <div style={s.errorBanner}>{errors.general}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div style={s.formGroup}>
            <label style={s.label}>Full Name <span style={{ color: "#ef4444" }}>*</span></label>
            <div style={s.inputWrap}>
              <MdPerson style={s.iconLeft} />
              <input
                type="text"
                name="name"
                style={{ ...s.input, ...(errors.name ? s.inputError : {}) }}
                placeholder="Dharmit Monani"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            {errors.name && <p style={s.fieldError}>⚠ {errors.name}</p>}
          </div>

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

          {/* Password */}
          <div style={s.formGroup}>
            <label style={s.label}>Password <span style={{ color: "#ef4444" }}>*</span></label>
            <div style={s.inputWrap}>
              <MdLock style={s.iconLeft} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                style={{ ...s.input, paddingRight: "2.8rem", ...(errors.password ? s.inputError : {}) }}
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                autoComplete="new-password"
              />
              <button
                type="button" style={s.eyeBtn}
                onClick={() => setShowPassword((p) => !p)}
                tabIndex={-1}
              >
                {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
              </button>
            </div>

            {/* Strength Meter */}
            {formData.password && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: "0.6rem" }}
              >
                {/* Bar */}
                <div style={s.strengthBarWrapper}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        ...s.strengthSegment,
                        background: i <= strength.level ? strength.color : "var(--border)",
                        transition: "background 0.3s ease",
                      }}
                    />
                  ))}
                  <span style={{ ...s.strengthLabel, color: strength.color }}>
                    {strength.label}
                  </span>
                </div>

                {/* Requirements Checklist */}
                {(passwordFocused || passedRules.length < 4) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={s.checklist}
                  >
                    {rules.map((rule) => {
                      const passed = rule.test(formData.password);
                      return (
                        <div key={rule.id} style={s.checkItem}>
                          <div style={{
                            ...s.checkIcon,
                            background: passed ? "#f0fdf4" : "#fef2f2",
                            color: passed ? "#22c55e" : "#ef4444",
                          }}>
                            {passed ? <MdCheck size={11} /> : <MdClose size={11} />}
                          </div>
                          <span style={{
                            ...s.checkLabel,
                            color: passed ? "#22c55e" : "var(--text-secondary)",
                            fontWeight: passed ? 600 : 400,
                          }}>
                            {rule.label}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </motion.div>
            )}

            {errors.password && <p style={s.fieldError}>⚠ {errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div style={s.formGroup}>
            <label style={s.label}>Confirm Password <span style={{ color: "#ef4444" }}>*</span></label>
            <div style={s.inputWrap}>
              <MdLock style={s.iconLeft} />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                style={{ ...s.input, paddingRight: "2.8rem", ...(errors.confirmPassword ? s.inputError : {}) }}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button" style={s.eyeBtn}
                onClick={() => setShowConfirm((p) => !p)}
                tabIndex={-1}
              >
                {showConfirm ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
              </button>
            </div>

            {/* Match indicator */}
            {formData.confirmPassword && (
              <p style={{
                fontSize: "0.78rem",
                marginTop: "0.3rem",
                color: formData.password === formData.confirmPassword ? "#22c55e" : "#ef4444",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}>
                {formData.password === formData.confirmPassword
                  ? <><MdCheck /> Passwords match</>
                  : <><MdClose /> Passwords do not match</>}
              </p>
            )}
            {errors.confirmPassword && <p style={s.fieldError}>⚠ {errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            <MdPersonAdd size={18} />
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={s.footer}>
          Already have an account?{" "}
          <Link to="/login" style={s.link}>Sign in</Link>
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
    padding: "1.5rem 1rem",
  },
  card: {
    background: "var(--bg-card)",
    borderRadius: "20px",
    border: "1px solid var(--border)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "440px",
  },
  logoWrapper: { display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center", marginBottom: "1.75rem" },
  logoIcon: {
    width: 42, height: 42, borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    display: "flex", alignItems: "center", justifyContent: "center",
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

  // Strength meter
  strengthBarWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  strengthSegment: {
    flex: 1,
    height: "5px",
    borderRadius: "999px",
  },
  strengthLabel: {
    fontSize: "0.75rem",
    fontWeight: 700,
    marginLeft: "0.5rem",
    minWidth: "48px",
  },

  // Checklist
  checklist: {
    marginTop: "0.6rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    background: "var(--secondary)",
    borderRadius: "10px",
    padding: "0.75rem",
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  checkIcon: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s",
  },
  checkLabel: {
    fontSize: "0.8rem",
    transition: "color 0.2s",
  },

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

export default Signup;